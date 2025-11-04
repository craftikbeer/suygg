# Настройка EmailJS для отправки формы

## Что нужно сделать

1. **Зарегистрироваться на EmailJS**
   - Перейти на https://www.emailjs.com/
   - Создать бесплатный аккаунт (до 200 писем/месяц)

2. **Создать Email Service**
   - В dashboard выбрать "Email Services"
   - Добавить Gmail (или другой сервис)
   - Подключить почту `neurocrafts@gmail.com`

3. **Создать Email Template**
   - В dashboard выбрать "Email Templates"
   - Создать новый шаблон
   - Использовать переменные:
     ```
     Имя: {{from_name}}
     Email: {{from_email}}
     Сообщение: {{message}}
     ```

4. **Получить API ключи**
   - Public Key (в Account → API Keys)
   - Service ID (из Email Services)
   - Template ID (из Email Templates)

5. **Обновить код**
   - Открыть `components/ContactForm.js`
   - Заменить:
     - `YOUR_PUBLIC_KEY` → ваш Public Key
     - `YOUR_SERVICE_ID` → ваш Service ID
     - `YOUR_TEMPLATE_ID` → ваш Template ID

## Текущий статус

✅ **EmailJS полностью настроен и работает!**

**Сейчас форма работает так:**
- ✅ Сохраняет данные в LocalStorage
- ✅ Отправляет письма на neurocrafts@gmail.com через EmailJS

**Настроенные ключи:**
- Public Key: `xYecC-27qntuOhKBp`
- Service ID: `service_fck3vzn`
- Template ID: `template_odvuxdx`

**Как включить отправку на email:**
1. Зарегистрируйтесь на https://www.emailjs.com/
2. Получите ключи (см. инструкцию выше)
3. Откройте `index.html`
4. Найдите раздел `EmailJS Configuration`
5. Раскомментируйте 3 строки и вставьте свои ключи:
   ```javascript
   window.EMAILJS_PUBLIC_KEY = 'ваш_public_key';
   window.EMAILJS_SERVICE_ID = 'ваш_service_id';
   window.EMAILJS_TEMPLATE_ID = 'ваш_template_id';
   ```

## Альтернатива

Если не хотите использовать EmailJS, можно настроить:
- Formspree (проще, но менее гибко)
- Собственный backend (сложнее, но полный контроль)