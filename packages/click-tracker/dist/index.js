var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from '@supabase/supabase-js';
// global variable 
let supabase;
let isTracking = false;
/**
 * @param clickData - Veritabanına kaydedilecek tıklama bilgileri.
 */
function sendToSupabase(clickData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from('clicks').insert([clickData]);
            if (error) {
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

 * @param selector - Tıklamaları izlenecek butonları hedefleyen bir CSS seçicisi.
 */
function trackClicks(selector, payload) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonData = Object.assign({ button_id: button.id || 'N/A', button_classes: button.className || 'N/A', button_text: button.innerText || 'N/A' }, (payload && { payload: payload }));
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
export function init(options) {
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
