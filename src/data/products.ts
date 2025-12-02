export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  gender: 'Men' | 'Women';
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  colorImages: {
    [key: string]: string 
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Casual Tees",
    price: 29.99,
    category: "Shirts",
    gender: "Men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    description: "Premium heavyweight cotton t-shirt. A wardrobe staple.",
    rating: { rate: 4.8, count: 420 },
    colorImages: {
      'White': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'Black': 'https://www.altart.in/cdn/shop/files/BlackOversizedPlainT-ShirtForMenFrontSide.png?v=1762796495&width=990', 
      'Navy': 'https://muselot.in/cdn/shop/products/muselot_s-plaint-shirtformeninnavybluecolor_2048x.jpg?v=1658089941'
    }
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 79.99,
    category: "Jeans",
    gender: "Men",
    image: "https://theclothingfactory.in/cdn/shop/files/TCF17-10-2472966CINES092.jpg?v=1730703048",
    description: "Classic straight leg denim with a vintage light wash.",
    rating: { rate: 4.7, count: 250 },
    colorImages: {
      'Blue': 'https://theclothingfactory.in/cdn/shop/files/TCF17-10-2472966CINES092.jpg?v=1730703048',
      'Black': 'https://tigc.in/cdn/shop/files/compress_men-solid-jeans-0923-361vtstdnm-08-dark-grey__1.jpg?v=1737626541',
      'Grey': 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/C24103s.jpg?im=Resize,width=750'
    }
  },
  {
    id: 3,
    name: "Sneakers",
    price: 95.00,
    category: "Shoes",
    gender: "Men",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/11e42067-dc25-4918-8d7a-36fdeec65bff/NIKE+DUNK+HI+RETRO.png",
    description: "Vintage inspired high-tops with premium leather accents.",
    rating: { rate: 4.8, count: 150 },
    colorImages: {
      'White': 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/11e42067-dc25-4918-8d7a-36fdeec65bff/NIKE+DUNK+HI+RETRO.png',
      'Red': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80',
      'Black': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80'
    }
  },
  {
    id: 4,
    name: "Men's Watches",
    price: 150.00,
    category: "Accessories",
    gender: "Men",
    image: "https://img.tatacliq.com/images/i2/1348Wx2000H/MP000000001905103_1348Wx2000H_20171007014154.jpeg",
    description: "Stainless steel timepiece with a clean, modern face.",
    rating: { rate: 4.7, count: 60 },
    colorImages: {
      'Silver': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      'Gold': 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80',
      'Black': 'https://img.tatacliq.com/images/i2/1348Wx2000H/MP000000001905103_1348Wx2000H_20171007014154.jpeg'
    }
  },
  {
    id: 5,
    name: "Casual Shirts",
    price: 59.99,
    category: "Shirts",
    gender: "Men",
    image: "https://imagescdn.thecollective.in/img/app/product/1/1059337-15452287.jpg?asp=true&crop=700&auto=format",
    description: "Crisp white oxford shirt, perfect for smart-casual looks.",
    rating: { rate: 4.6, count: 180 },
    colorImages: {
      'White': 'https://roseborn.com/cdn/shop/files/shirt9_1.png?v=1727688283&width=1445',
      'Blue': 'https://imagescdn.thecollective.in/img/app/product/1/1059337-15452287.jpg?asp=true&crop=700&auto=format',
      'Pink': 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/C52122s4.jpg?im=Resize,width=750'
    }
  },
  {
    id: 6,
    name: "High Boots",
    price: 110.00,
    category: "Shoes",
    gender: "Men",
    image: "https://www.gordonbros.in/cdn/shop/files/1_1cb115e2-4ea8-4fc2-aade-849fe6702d1d.jpg?v=1756744266&width=2048",
    description: "Classic Chelsea silhouette in rich tan suede.",
    rating: { rate: 4.7, count: 90 },
    colorImages: {
      'Tan': 'https://www.theroyalepeacock.com/cdn/shop/files/background-editor_output_25c04dd5-0d25-477b-8e2b-ee89d838c196.png?v=1727526424',
      'Black': 'https://www.gordonbros.in/cdn/shop/files/1_1cb115e2-4ea8-4fc2-aade-849fe6702d1d.jpg?v=1756744266&width=2048',
      'Brown': 'https://www.theroyalepeacock.com/cdn/shop/files/TheRoyalePeacockBrownSuedeLeatherChelseaBootforMen.jpg?v=1728222235'
    }
  },

  {
    id: 7,
    name: "Crop Tops",
    price: 45.00,
    category: "Shirts",
    gender: "Women",
    image: "https://www.bitterlime.in/cdn/shop/products/1_789f9b49-b9b6-42ed-a42a-da69f20e5c67.jpg?v=1675155100",
    description: "Elegant silk blouse suitable for office or evening wear.",
    rating: { rate: 4.5, count: 310 },
    colorImages: {
      'Blue': 'https://www.bitterlime.in/cdn/shop/products/1_789f9b49-b9b6-42ed-a42a-da69f20e5c67.jpg?v=1675155100',
      'White': 'https://ishinfashions.com/cdn/shop/products/Topitf-19037_3.jpg?v=1650287137&width=1080',
      'Red': 'https://neonstreet.co.in/cdn/shop/files/mockup-of-a-crop-top-ringer-t-shirt-27737_12.png?v=1744046650&width=1445'
    }
  },
  {
    id: 8,
    name: "Skinny Jeans",
    price: 55.50,
    category: "Jeans",
    gender: "Women",
    image: "https://m.media-amazon.com/images/I/71DKXNucXJL._AC_UY1100_.jpg",
    description: "Form-fitting high-waist jeans with comfortable stretch.",
    rating: { rate: 4.4, count: 340 },
    colorImages: {
      'Blue': 'https://m.media-amazon.com/images/I/71DKXNucXJL._AC_UY1100_.jpg',
      'Black': 'https://assets.ajio.com/medias/sys_master/root/20241204/E0Kt/675070790f47f80c87d5cc77/-473Wx593H-442705256-black-MODEL.jpg',
      'White': 'https://m.media-amazon.com/images/I/81W6Z2Xsn-L._AC_UY1100_.jpg'
    }
  },
  {
    id: 9,
    name: "Leather Purse",
    price: 120.00,
    category: "Accessories",
    gender: "Women",
    image: "https://teakwoodleathers.com/cdn/shop/files/T_HB_W_RC_087_BL_1080x.jpg?v=1750933280",
    description: "Handcrafted leather bag for your daily essentials.",
    rating: { rate: 4.9, count: 95 },
    colorImages: {
      'Brown': 'https://teakwoodleathers.com/cdn/shop/files/T_HB_W_RC_087_BR_1080x.jpg?v=1750933278',
      'Black': 'https://teakwoodleathers.com/cdn/shop/files/T_HB_W_RC_087_BL_1080x.jpg?v=1750933280',
      'Tan': 'https://www.berrylush.com/cdn/shop/files/0_b376bc93-7918-46f7-b9cc-cb0d28bb8d68.jpg?v=1752842980'
    }
  },
  {
    id: 10,
    name: "Women's Trainers",
    price: 89.99,
    category: "Shoes",
    gender: "Women",
    image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/16880604/2022/11/7/fbd25b13-901d-427c-bbd8-b6ea584ff1a71667823348952-Puma-Men-Sports-Shoes-811667823348273-1.jpg",
    description: "Lightweight mesh trainers built for speed and comfort.",
    rating: { rate: 4.6, count: 500 },
    colorImages: {
      'Red': 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/16880604/2022/11/7/fbd25b13-901d-427c-bbd8-b6ea584ff1a71667823348952-Puma-Men-Sports-Shoes-811667823348273-1.jpg',
      'Blue': 'https://img.tatacliq.com/images/i13/437Wx649H/MP000000019480546_437Wx649H_202309282226151.jpeg',
      'White': 'https://www.campusshoes.com/cdn/shop/products/RAISE_WHT_f1a5a2ec-8a23-4795-a796-0da7455dc57a.jpg?v=1757593683'
    }
  },
  {
    id: 11,
    name: "Sunglasses",
    price: 25.00,
    category: "Accessories",
    gender: "Women",
    image: "https://img4.dhresource.com/webp/m/0x0/f3/albu/km/o/10/60fa662a-c931-4650-954d-a8867f1ed5b2.jpg",
    description: "Classic oversized frames with UV protection.",
    rating: { rate: 4.3, count: 400 },
    colorImages: {
      'Brown': 'https://img.cdn.mountainwarehouse.com/product/055623/055623_bro_sydney_womens_tortoise_sunglasses_acc_ss24_01.jpg?w=900',
      'Black': 'https://img4.dhresource.com/webp/m/0x0/f3/albu/km/o/10/60fa662a-c931-4650-954d-a8867f1ed5b2.jpg',
      'Gold': 'https://m.media-amazon.com/images/I/61vjnLjicCL._UY1000_.jpg'
    }
  },
  {
    id: 12,
    name: "Loose Fit Jeans",
    price: 65.00,
    category: "Jeans",
    gender: "Women",
    image: "https://www.jiomart.com/images/product/original/rvxierv5cn/ice-blue-stonewash-high-rise-straight-fit-boyfriend-jeans-1205-26-ice-blue-product-images-rvxierv5cn-0-202308122112.jpg?im=Resize=(1000,1000)",
    description: "Relaxed fit denim for an effortless casual look.",
    rating: { rate: 4.5, count: 180 },
    colorImages: {
      'Blue': 'https://www.jiomart.com/images/product/original/rvxierv5cn/ice-blue-stonewash-high-rise-straight-fit-boyfriend-jeans-1205-26-ice-blue-product-images-rvxierv5cn-0-202308122112.jpg?im=Resize=(1000,1000)',
      'Black': 'https://www.jiomart.com/images/product/original/rvpnn5mxse/guti-womens-high-rise-ankle-length-black-boyfriend-jeans-product-images-rvpnn5mxse-0-202209070213.jpg?im=Resize=(500,630)',
      'Light Blue': 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80'
    }
  }
];