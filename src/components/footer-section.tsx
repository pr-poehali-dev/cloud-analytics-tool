export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      {/* Left Section: Logo, Description, Contacts */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">Контракт Кофе</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-left">Кофе под вашим брендом</p>
        <div className="flex flex-col justify-start items-start gap-2">
          <p className="text-foreground/90 text-sm font-medium leading-5">Денис Гиззатов</p>
          <a href="mailto:gid150@mail.ru" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
            gid150@mail.ru
          </a>
          <a href="https://t.me/+79042474302" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-normal leading-5 hover:text-foreground transition-colors">
            +7 (904) 247-43-02
          </a>
          <span className="text-muted-foreground text-xs leading-4">Telegram / WhatsApp</span>
        </div>
      </div>
      {/* Right Section: Product, Company, Resources */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Услуги</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Обжарка кофе
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Разработка рецептуры
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Дизайн упаковки
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Контрактное производство
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Доставка
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Компания</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              О нас
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Производство
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Качество
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Партнёрам
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Контакты
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">Документы</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Сертификаты
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Политика качества
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Условия сотрудничества
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:underline">
              Поддержка
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}