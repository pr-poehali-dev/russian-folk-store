import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BalloonProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends BalloonProduct {
  quantity: number;
}

const Index: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('главная');

  const balloonProducts: BalloonProduct[] = [
    {
      id: 1,
      name: "Хохлома Праздничная",
      price: 150,
      image: "/img/57882b9a-9744-4bd3-acb5-db9d93654a5b.jpg",
      description: "Воздушные шарики с традиционными хохломскими узорами",
      category: "Народные"
    },
    {
      id: 2,
      name: "Матрёшка Веселая",
      price: 120,
      image: "/img/f7d52c95-1e1a-45c8-a6fb-c1d970c7ec26.jpg",
      description: "Шарики с изображением русских матрёшек",
      category: "Народные"
    },
    {
      id: 3,
      name: "Гжельские Узоры",
      price: 180,
      image: "/img/92ae0384-df97-44be-abc6-7cc4408088ad.jpg",
      description: "Бело-синие шарики в стиле гжельской росписи",
      category: "Керамические мотивы"
    },
    {
      id: 4,
      name: "Павлово-Посадские",
      price: 200,
      image: "/img/57882b9a-9744-4bd3-acb5-db9d93654a5b.jpg",
      description: "Шарики с узорами павлово-посадских платков",
      category: "Текстильные"
    },
    {
      id: 5,
      name: "Городецкие Мотивы",
      price: 160,
      image: "/img/92ae0384-df97-44be-abc6-7cc4408088ad.jpg",
      description: "Яркие шарики в стиле городецкой росписи",
      category: "Народные"
    },
    {
      id: 6,
      name: "Русский Орнамент",
      price: 140,
      image: "/img/f7d52c95-1e1a-45c8-a6fb-c1d970c7ec26.jpg",
      description: "Традиционные русские орнаменты на красном фоне",
      category: "Классические"
    }
  ];

  const addToCart = (product: BalloonProduct) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const navigationItems = [
    { key: 'главная', label: 'Главная', icon: 'Home' },
    { key: 'каталог', label: 'Каталог', icon: 'Package' },
    { key: 'корзина', label: 'Корзина', icon: 'ShoppingCart' },
    { key: 'доставка', label: 'Доставка', icon: 'Truck' },
    { key: 'о-нас', label: 'О нас', icon: 'Users' },
    { key: 'контакты', label: 'Контакты', icon: 'Phone' }
  ];

  const renderNavigation = () => (
    <header className="bg-primary text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">🎈</span>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold">Русские Шарики</h1>
              <p className="text-sm opacity-90">Народный магазин воздушных шаров</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2 md:gap-4">
            {navigationItems.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-folk ${
                  activeSection === item.key 
                    ? 'bg-secondary text-white' 
                    : 'hover:bg-primary/20 hover:text-white'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span>{item.label}</span>
                {item.key === 'корзина' && getTotalItems() > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-accent">
                    {getTotalItems()}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );

  const renderHero = () => (
    <section 
      className="relative bg-gradient-to-r from-primary via-secondary to-primary py-20 px-6 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.8), rgba(220, 20, 60, 0.8)), url('/img/92ae0384-df97-44be-abc6-7cc4408088ad.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
          🎈 Добро пожаловать! 🎈
        </h2>
        <p className="text-xl md:text-2xl font-folk mb-8 max-w-3xl mx-auto">
          В нашем народном магазине вы найдёте самые красивые воздушные шарики 
          с традиционными русскими узорами и орнаментами
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => setActiveSection('каталог')}
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white font-folk text-lg px-8 py-4"
          >
            <Icon name="Package" className="mr-2" />
            Смотреть каталог
          </Button>
          <div className="flex items-center gap-2 text-lg font-folk">
            <Icon name="Star" className="text-folk-gold" />
            <span>Более 1000 довольных покупателей</span>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCatalog = () => (
    <section className="py-12 px-6 bg-muted/30">
      <div className="container mx-auto">
        <h3 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
          🎨 Наши Народные Шарики 🎨
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {balloonProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-heading text-primary">{product.name}</CardTitle>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    {product.category}
                  </Badge>
                </div>
                <CardDescription className="font-folk">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-secondary">{product.price} ₽</span>
                  <span className="text-sm text-muted-foreground font-folk">за штуку</span>
                </div>
                <Button 
                  onClick={() => addToCart(product)}
                  className="bg-primary hover:bg-primary/90 font-folk"
                >
                  <Icon name="ShoppingCart" className="mr-2" size={16} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const renderCart = () => (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
          🛒 Ваша Корзина
        </h3>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted" />
            <p className="text-xl font-folk text-muted-foreground mb-4">
              Корзина пуста
            </p>
            <Button 
              onClick={() => setActiveSection('каталог')}
              className="bg-primary hover:bg-primary/90 font-folk"
            >
              Перейти к каталогу
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-heading text-primary font-bold">{item.name}</h4>
                      <p className="text-secondary font-bold">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="font-bold min-w-[2rem] text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card className="p-6 bg-muted/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-heading font-bold">Итого:</span>
                <span className="text-2xl font-bold text-secondary">{getTotalPrice()} ₽</span>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-accent hover:bg-accent/90 font-folk text-lg"
              >
                <Icon name="CreditCard" className="mr-2" />
                Оформить заказ
              </Button>
            </Card>
          </>
        )}
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="py-12 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
          🏠 О нашем магазине
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg font-folk mb-4">
              Мы создаём воздушные шарики, вдохновлённые красотой русского народного искусства. 
              Каждый шарик - это маленькое произведение искусства с традиционными узорами.
            </p>
            <p className="text-lg font-folk mb-6">
              Наша миссия - сохранить и популяризировать традиции русского декоративно-прикладного 
              искусства через современные праздничные аксессуары.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-accent" />
                <span className="font-folk">Высокое качество материалов</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-accent" />
                <span className="font-folk">Уникальные народные дизайны</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Check" className="text-accent" />
                <span className="font-folk">Быстрая доставка по всей России</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <img 
              src="/img/f7d52c95-1e1a-45c8-a6fb-c1d970c7ec26.jpg" 
              alt="О нас"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderDelivery = () => (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
          🚚 Доставка и оплата
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h4 className="text-xl font-heading font-bold mb-4 text-secondary">
              <Icon name="Truck" className="inline mr-2" />
              Способы доставки
            </h4>
            <div className="space-y-3 font-folk">
              <div className="flex justify-between">
                <span>Курьерская доставка по Москве</span>
                <span className="font-bold">300 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка по России (Почта России)</span>
                <span className="font-bold">от 200 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Самовывоз</span>
                <span className="font-bold text-accent">Бесплатно</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="text-xl font-heading font-bold mb-4 text-secondary">
              <Icon name="CreditCard" className="inline mr-2" />
              Способы оплаты
            </h4>
            <div className="space-y-3 font-folk">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-accent" size={16} />
                <span>Банковская карта онлайн</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-accent" size={16} />
                <span>Наличными при получении</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-accent" size={16} />
                <span>Переводом на карту</span>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 mt-8 bg-muted/30">
          <h4 className="text-lg font-heading font-bold mb-3 text-primary">
            📦 Условия доставки
          </h4>
          <p className="font-folk">
            Бесплатная доставка при заказе от 2000 ₽. Срок доставки по Москве - 1-2 дня, 
            по России - 3-7 дней. Все шарики упакованы в специальную защитную упаковку.
          </p>
        </Card>
      </div>
    </section>
  );

  const renderContacts = () => (
    <section className="py-12 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-3xl font-heading font-bold text-center mb-8 text-primary">
          📞 Наши контакты
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h4 className="text-xl font-heading font-bold mb-4 text-secondary">
              Связаться с нами
            </h4>
            <div className="space-y-4 font-folk">
              <div className="flex items-center gap-3">
                <Icon name="Phone" className="text-accent" />
                <div>
                  <p className="font-bold">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Mail" className="text-accent" />
                <div>
                  <p className="font-bold">info@russhare.ru</p>
                  <p className="text-sm text-muted-foreground">Отвечаем в течение часа</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MapPin" className="text-accent" />
                <div>
                  <p className="font-bold">г. Москва, ул. Народная, д. 25</p>
                  <p className="text-sm text-muted-foreground">Пункт самовывоза</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h4 className="text-xl font-heading font-bold mb-4 text-secondary">
              Режим работы
            </h4>
            <div className="space-y-2 font-folk">
              <div className="flex justify-between">
                <span>Пн - Пт:</span>
                <span className="font-bold">9:00 - 19:00</span>
              </div>
              <div className="flex justify-between">
                <span>Суббота:</span>
                <span className="font-bold">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Воскресенье:</span>
                <span className="font-bold">11:00 - 17:00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'каталог':
        return renderCatalog();
      case 'корзина':
        return renderCart();
      case 'о-нас':
        return renderAbout();
      case 'доставка':
        return renderDelivery();
      case 'контакты':
        return renderContacts();
      default:
        return (
          <>
            {renderHero()}
            {renderCatalog()}
          </>
        );
    }
  };

  const renderFooter = () => (
    <footer className="bg-primary text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-heading font-bold mb-4">Русские Шарики</h4>
            <p className="font-folk text-sm opacity-90">
              Народный магазин воздушных шаров с традиционными русскими узорами
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-3">Каталог</h5>
            <div className="space-y-1 text-sm font-folk">
              <p>Хохломские шарики</p>
              <p>Гжельские узоры</p>
              <p>Матрёшки</p>
              <p>Городецкие мотивы</p>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-3">Информация</h5>
            <div className="space-y-1 text-sm font-folk">
              <p>О компании</p>
              <p>Доставка и оплата</p>
              <p>Возврат товара</p>
              <p>Контакты</p>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-3">Контакты</h5>
            <div className="space-y-1 text-sm font-folk">
              <p>+7 (495) 123-45-67</p>
              <p>info@russhare.ru</p>
              <p>г. Москва, ул. Народная, 25</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="font-folk text-sm opacity-75">
            © 2024 Русские Шарики. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      <main>
        {renderContent()}
      </main>
      {renderFooter()}
    </div>
  );
};

export default Index;