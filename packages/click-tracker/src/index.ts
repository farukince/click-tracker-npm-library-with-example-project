import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface TrackerOptions {
  supabaseUrl: string;       
  supabaseAnonKey: string;   
  selector?: string;         // Belirli butonları izlemek için CSS seçici.
  payload?: Record<string, any>; // Her tıklamaya eklenebilecek özel veri objesi.
}

interface ButtonClickDetail {
  button_id: string;
  button_classes: string;
  button_text: string;
  payload?: Record<string, any>; 
}
// global variable 
let supabase: SupabaseClient; 
let isTracking = false;


/**
 * @param clickData - Veritabanına kaydedilecek tıklama bilgileri.
 */
async function sendToSupabase(clickData: ButtonClickDetail) {
  try {
    const { error } = await supabase.from('clicks').insert([clickData]);

    if (error) {
      console.error('Error sending data to Supabase:', error.message);
    } else {
      console.log('Click data successfully sent to Supabase.');
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}


/**

 * @param selector - Tıklamaları izlenecek butonları hedefleyen bir CSS seçicisi.
 */

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
 * kütüphanenin ana fonksiyonu
 * @param options - Kütüphane ayarları 
 */
export function init(options: TrackerOptions): void {
  if (isTracking) {
    console.warn('Click Tracker is already running.');
    return;
  }

  if (!options.supabaseUrl || !options.supabaseAnonKey) {
    console.error('Supabase URL and Anon Key are required in init options.');
    return;
  }
  
  supabase = createClient(options.supabaseUrl, options.supabaseAnonKey);

  const selector = options.selector || 'button';

  console.log(`Click Tracker started. Tracking clicks on: ${selector}`);
  isTracking = true;
  
  trackClicks(selector, options.payload);
}