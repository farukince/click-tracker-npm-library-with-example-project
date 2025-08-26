<div align="center">
  <img src="https://raw.githubusercontent.com/google/material-design-icons/master/png/action/touch_app/materialicons/48dp/2x/baseline_touch_app_black_48dp.png" alt="Project Logo">
  <h1 align="center">From Problem to Publication: An NPM Library Project</h1>
  <p align="center">
    This repository documents the end-to-end process of creating, testing, and publishing a real-world NPM library.
  </p>
</div>

---

## 🇬🇧 About The Project (English)

This project was created as part of a frontend development internship to demonstrate the topic: **"From Solving a Problem to Publishing an NPM Library: A Step-by-Step Process"** with a concrete example. This repository contains not only the final library but the entire journey of developing and publishing it.

### Project Goal

The primary goal is to experience the full lifecycle of an NPM package in a modern JavaScript/TypeScript ecosystem:
1.  **Problem Identification:** Defining a recurring need (tracking button clicks).
2.  **Development:** Creating a reusable and configurable library with TypeScript.
3.  **Integration:** Saving data to an external database using Supabase as a Backend-as-a-Service.
4.  **Testing:** Verifying the developed library in a local React application (the example project).
5.  **Documentation:** Preparing clear `README.md` files for both the library's users and the project itself.
6.  **Publication:** Publishing the package to the NPM registry and managing version control on GitHub.

### Project Structure

This is a "monorepo" structure managed with NPM Workspaces:

-   **/packages/click-tracker**: Contains the source code for the actual NPM library.
-   **/example**: A React + TypeScript project, built with `create-react-app`, used for testing the library.

### Installing and Using the Published Package

The library within this project is published on NPM. You can install it in your own projects using the following command:

```bash
npm install @farukiince/click-tracker
```
*Note: Replace `@your-npm-username` with the actual NPM username.*

---

## 🇹🇷 Proje Hakkında (Turkish)

Bu proje, bir frontend geliştirme stajı kapsamında, **"Bir Problemi Çözmekten NPM Kütüphanesi Yayınlamaya: Adım Adım Süreç"** konusunu somut bir örnekle hayata geçirmek amacıyla oluşturulmuştur. Depo, sadece sonuçtaki kütüphaneyi değil, aynı zamanda bu kütüphaneyi geliştirme ve yayınlama yolculuğunun tamamını içermektedir.

### Projenin Amacı

Temel amaç, modern bir JavaScript/TypeScript ekosisteminde bir NPM paketinin tüm yaşam döngüsünü deneyimlemektir:
1.  **Problem Tespiti:** Tekrar eden bir ihtiyacı belirlemek (buton tıklamalarını izleme).
2.  **Geliştirme:** TypeScript ile yeniden kullanılabilir, yapılandırılabilir bir kütüphane oluşturmak.
3.  **Entegrasyon:** Backend servisi olarak Supabase kullanarak verileri harici bir veritabanına kaydetmek.
4.  **Test:** Geliştirilen kütüphaneyi yerel bir React uygulamasında (örnek proje) test etmek ve doğrulamak.
5.  **Dokümantasyon:** Hem kütüphanenin kullanıcıları hem de projenin kendisi için anlaşılır `README.md` dosyaları hazırlamak.
6.  **Yayınlama:** Paketi NPM registry'sine yüklemek ve GitHub'da versiyon kontrolü yapmak.

### Proje Yapısı

Bu bir "monorepo" yapısıdır ve NPM Workspaces kullanılarak yönetilir:

-   **/packages/click-tracker**: Asıl NPM kütüphanesinin kaynak kodlarının bulunduğu yer.
-   **/example**: Kütüphaneyi test etmek için oluşturulmuş, `create-react-app` tabanlı React + TypeScript projesi.

### Yayınlanan Paketi Kurma ve Kullanma

Bu proje içindeki kütüphane NPM'de yayınlanmıştır. Kendi projelerinize aşağıdaki komutu kullanarak kurabilirsiniz:

```bash
npm install @farukiince/click-tracker
```
*Not: `@senin-npm-kullanici-adin` kısmını gerçek NPM kullanıcı adınızla değiştirin.*

