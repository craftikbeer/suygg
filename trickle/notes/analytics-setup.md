# Google Analytics Setup

## Текущий статус

✅ **Google Analytics ПОДКЛЮЧЕН И РАБОТАЕТ**

Measurement ID: `G-TQVEB29TNF`

Подробная информация о настройке в файле `trickle/notes/google-analytics-setup.md`

## Как подключить

1. **Создайте аккаунт Google Analytics**
   - Перейдите на https://analytics.google.com
   - Создайте новый аккаунт и свойство

2. **Получите Measurement ID**
   - Формат: `G-XXXXXXXXXX`
   - Найдите его в разделе "Администратор" → "Потоки данных"

3. **Обновите код в `index.html`**
   - Найдите секцию `<!-- Google Analytics 4 -->`
   - Замените `G-XXXXXXXXXX` на ваш реальный ID (2 раза)
   - Раскомментируйте весь блок кода

4. **Проверьте работу**
   - Откройте сайт
   - Зайдите в Google Analytics → Отчеты → Реального времени
   - Должен отобразиться ваш визит

## Альтернатива: Yandex.Metrika

Yandex.Metrika тоже закомментирован в `index.html`. Настройка аналогична:
- Создайте счетчик на https://metrika.yandex.ru
- Замените `XXXXXXXX` на ваш ID
- Раскомментируйте код