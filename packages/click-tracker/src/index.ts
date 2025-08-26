// 1. Supabase istemcisini ve gerekli tipleri import et.
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 2. Kütüphane ayarları için arayüzü Supabase bilgilerini içerecek şekilde genişlet.
interface TrackerOptions {
  supabaseUrl: string;       // Kullanıcının Supabase proje URL'si (ZORUNLU)
  supabaseAnonKey: string;   // Kullanıcının Supabase anon anahtarı (ZORUNLU)
  selector?: string;         // İzlenecek butonlar için CSS seçicisi (OPSİYONEL)
  payload?: Record<string, any>; // YENİ: Her tıklamaya eklenecek özel veri objesi.
}

// Tıklama verisinin yapısı (DB'deki sütunlarla eşleşmeli)
interface ButtonClickDetail {
  button_id: string;
  button_classes: string;
  button_text: string;
  payload?: Record<string, any>; // YENİ: Veritabanına gidecek payload verisi.
}

// Global değişkenleri tanımla
let supabase: SupabaseClient; // Supabase istemcisi bu değişkende tutulacak.
let isTracking = false;


/**
 * Yakalanan tıklama verisini Supabase'e gönderir.
 * @param clickData - Veritabanına kaydedilecek tıklama bilgileri.
 */
async function sendToSupabase(clickData: ButtonClickDetail) {
  try {
    // 'clicks' tablosuna yeni bir satır ekle.
    const { error } = await supabase.from('clicks').insert([clickData]);

    if (error) {
      // Eğer bir hata olursa, bunu geliştirici konsolunda göster.
      console.error('Error sending data to Supabase:', error.message);
    } else {
      console.log('Click data successfully sent to Supabase.');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}


/**
 * Belirtilen seçiciye sahip tüm butonları bulur ve tıklama izleyicisini ekler.
 * @param selector - Tıklamaları izlenecek butonları hedefleyen bir CSS seçicisi.
 */
// GÜNCELLENDİ: 'payload' parametresi eklendi.
// Sadece trackClicks fonksiyonunu güncelliyoruz

function trackClicks(selector: string, payload?: Record<string, any>): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(selector);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonData: ButtonClickDetail = {
        button_id: button.id || 'N/A',
        button_classes: button.className || 'N/A',
        button_text: button.innerText || 'N/A',
        ...(payload && { payload: payload })
      };
      
      // YENİDEN EKLENDİ: Arayüzü bilgilendirmek için Event fırlat.
      const event = new CustomEvent('buttonClicked', {
        detail: buttonData
      });
      document.dispatchEvent(event);

      console.log('Button clicked:', buttonData);
      sendToSupabase(buttonData);
    });
  });
}

/**
 * Kütüphaneyi başlatan ana fonksiyon.
 * @param options - Kütüphane ayarları (Supabase URL ve Anon Key içermeli).
 */
export function init(options: TrackerOptions): void {
  if (isTracking) {
    console.warn('Click Tracker is already running.');
    return;
  }

  // 5. Supabase URL ve Anahtarının sağlanıp sağlanmadığını kontrol et.
  if (!options.supabaseUrl || !options.supabaseAnonKey) {
    console.error('Supabase URL and Anon Key are required in init options.');
    return;
  }
  
  // 6. Gelen bilgilerle Supabase istemcisini oluştur ve global değişkene ata.
  supabase = createClient(options.supabaseUrl, options.supabaseAnonKey);

  const selector = options.selector || 'button';

  console.log(`Click Tracker started. Tracking clicks on: ${selector}`);
  isTracking = true;
  // GÜNCELLENDİ: payload'ı trackClicks fonksiyonuna iletiyoruz.
  trackClicks(selector, options.payload);
}