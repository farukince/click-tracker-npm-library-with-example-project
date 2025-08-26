interface TrackerOptions {
    supabaseUrl: string;
    supabaseAnonKey: string;
    selector?: string;
    payload?: Record<string, any>;
}
/**
 * Kütüphaneyi başlatan ana fonksiyon.
 * @param options - Kütüphane ayarları (Supabase URL ve Anon Key içermeli).
 */
export declare function init(options: TrackerOptions): void;
export {};
