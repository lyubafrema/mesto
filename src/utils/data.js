// конфиг валидации
export const config = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
});

//массив изначальных карточек
const elements = [
  {
    title: 'Сидней',
    src: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Вид на бухту и оперный театр Сиднея.'
  },
  {
    title: 'Фарерские острова',
    src: 'https://images.unsplash.com/photo-1509099395498-a26c959ba0b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Домики с покрытыми травой крышами в окружении зеленых скал.'
  },
  {
    title: 'Сан-Франциско',
    src: 'https://images.unsplash.com/photo-1521464302861-ce943915d1c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    alt: 'Мост "Золотые ворота".'
  },
  {
    title: 'Рио-де-Жанейро',
    src: 'https://images.unsplash.com/photo-1561577553-674ce32847a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Вид на город среди зеленых скал и бухту с канатной дороги.'
  },
  {
    title: 'Рим',
    src: 'https://images.unsplash.com/photo-1569230516306-5a8cb5586399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    alt: 'Брусчатая улочка с пиццерией.'
  },
  {
    title: 'Новая Зеландия',
    src: 'https://images.unsplash.com/photo-1566141832349-6a448fbc1988?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'Горы спускаются к берегу океана.'
  },
];

export default elements;
