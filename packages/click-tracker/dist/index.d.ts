interface TrackerOptions {
    supabaseUrl: string;
    supabaseAnonKey: string;
    selector?: string;
    payload?: Record<string, any>;
}
/**
 * kütüphanenin ana fonksiyonu
 * @param options - Kütüphane ayarları
 */
export declare function init(options: TrackerOptions): void;
export {};
