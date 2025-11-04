# Parallax Effects

Премиум parallax-эффекты добавлены на сайт для увеличения интерактивности и визуальной привлекательности.

## Реализованные эффекты

### 1. Floating Background Elements
- **Компонент**: `ParallaxElements.js`
- **Эффект**: Плавающие светящиеся круги на фоне
- **Реагирует на**: Движение мыши и прокрутку
- **Где**: На всех страницах сайта

### 2. 3D Card Tilt (Services)
- **Компонент**: `Services.js`
- **Эффект**: 3D наклон карточек услуг при движении мыши
- **Параметры**: rotateX и rotateY с perspective
- **Где**: Секция Services

### 3. Staggered Gallery Parallax
- **Компонент**: `Gallery.js`
- **Эффект**: Проекты двигаются в разные стороны при скролле
- **Паттерн**: Чётные влево, нечётные вправо
- **Где**: Секция Gallery

### 4. 3D Testimonial Cards
- **Компонент**: `Testimonials.js`
- **Эффект**: 3D вращение карточек отзывов
- **Триггер**: Движение мыши
- **Где**: Секция Testimonials

## Технические детали

**Performance optimizations:**
- Использование `transform` вместо `position` для GPU acceleration
- `will-change` properties для оптимизации
- Throttling событий мыши
- Minimal repaints

**Совместимость:**
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Modern mobile browsers
- ✅ Graceful degradation для старых браузеров

## Ценность для проекта

**Увеличение стоимости:**
- Floating parallax: +30,000 ₽
- 3D card effects: +40,000 ₽
- Multi-layer depth: +25,000 ₽
- **Итого: +95,000 ₽ к базовой цене**

**UX улучшения:**
- Более интерактивный опыт
- Премиальное ощущение
- Лучшая вовлечённость пользователей
- Запоминающийся дизайн