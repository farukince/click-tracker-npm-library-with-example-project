var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 1. Supabase istemcisini ve gerekli tipleri import et.
import { createClient } from '@supabase/supabase-js';
// Global değişkenleri tanımla
let supabase; // Supabase istemcisi bu değişkende tutulacak.
let isTracking = false;
/**
 * Yakalanan tıklama verisini Supabase'e gönderir.
 * @param clickData - Veritabanına kaydedilecek tıklama bilgileri.
 */
function sendToSupabase(clickData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 'clicks' tablosuna yeni bir satır ekle.
            const { error } = yield supabase.from('clicks').insert([clickData]);
            if (error) {
                // Eğer bir hata olursa, bunu geliştirici konsolunda göster.
                console.error('Error sending data to Supabase:', error.message);
            }
            else {
                console.log('Click data successfully sent to Supabase.');
            }
        }
        catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    });
}
/**
 * Belirtilen seçiciye sahip tüm butonları bulur ve tıklama izleyicisini ekler.
 * @param selector - Tıklamaları izlenecek butonları hedefleyen bir CSS seçicisi.
 */
// GÜNCELLENDİ: 'payload' parametresi eklendi.
// Sadece trackClicks fonksiyonunu güncelliyoruz
function trackClicks(selector, payload) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonData = Object.assign({ button_id: button.id || 'N/A', button_classes: button.className || 'N/A', button_text: button.innerText || 'N/A' }, (payload && { payload: payload }));
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
export function init(options) {
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
