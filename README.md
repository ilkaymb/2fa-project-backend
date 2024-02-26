
# 2FA Project Backend
Kullanıcıların iki faktörlü kimlik doğrulama (2FA) mekanizması aracılığıyla güvenli bir şekilde giriş yapmalarını sağlar. Kullanıcı adı ve şifre ile giriş yapıldıktan sonra, sistem otomatik olarak kullanıcının e-posta adresine bir OTP (Tek Kullanımlık Şifre) gönderir. Kullanıcı bu OTP'yi girerek kimliğini doğrular ve profil sayfasına yönlendirilir.

## Önkoşullar
* Node.js
* npm

## Kurulum
**1.  Repo'yu klonlayın:**
 git clone https://github.com/ilkaymb/2fa-project-backend.git
cd 2fa-project-backend
**2. Gerekli npm paketlerini kurun**
npm install
**3. .env dosyasını oluşturun ve gerekli ortam değişkenlerini (environment variables) belirtin.**

Örnek:

STEP1_KEY=SECRET_KEY1 

STEP2_KEY=SECRET_KEY2 

MAIL_USERNAME=EXAMPLE_MAIL 

MAIL_PASSWORD=EXAMPLE_PASSWORD    

Aşağıda belirttiğim çalışma kısmı notlarında uygulama için mail şifresi nasıl alınır detaylarıyla anlattım.

**4. Uygulamayı çalıştırın:**
nodemon app.js

## Çalıştırma Notları
**Mail Şifresi**
Mail adresi için örnek bir gmail hesabı açtıktan sonra sağ köşeden profil resminize tıkladıktan sonra "Google Hesabınızı Yönetin" butonuna basın. Açılan sayfanın arama kısmına "uygulama şifreleri" yazın ve sonuca tıklayın. Uygulamanız için yeni bir şifre alın buradan aldığınız şifreyi .env dosyasındaki "EXAMPLE_PASSWORD" yerine yazabilirsniz
