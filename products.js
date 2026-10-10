/* Product catalogue shared by both pages */
(function () {
  const PERF = {
    feats: [['stopwatch', 'Long Lasting', '(8–12 hours)'], ['flower2', 'Premium', 'Ingredients'], ['gift', 'Elegant', 'Packaging'], ['truck', 'Free Shipping', '(Above ₹999)']],
    ing: 'Alcohol denat., Parfum (fragrance), Aqua, natural essential oils, fixatives and UV filters. Dermatologically tested. Not tested on animals.',
    how: ['Apply on clean, dry skin right after a bath.', 'Spray 2–3 times on pulse points – wrists, neck and behind the ears – from 15–20 cm.', 'Do not rub the wrists together; let the scent dry naturally.', 'Avoid contact with eyes and keep away from flame. Store in a cool, dry place.'],
    unit: 'Eau de Parfum', size: '50ml', kind: 'Perfume'
  };
  const AGAR = {
    feats: [['hourglass-split', 'Long Burning', '(40–45 min)'], ['leaf', '100% Natural', 'Ingredients'], ['hand-index-thumb', 'Hand', 'Rolled'], ['truck', 'Free Shipping', '(Above ₹999)']],
    ing: 'Natural charcoal-free bamboo sticks, herbal powders, wood dust, natural resins and pure essential oils. No harmful chemicals or synthetic dyes.',
    how: ['Place the agarbatti in a stand on a stable, non-flammable surface.', 'Light the tip, let it flame for a few seconds, then blow it out so it glows.', 'Keep away from curtains, children and pets; ensure light ventilation.', 'Let the stick burn completely. Pack of 20 sticks, burns 40–45 minutes each.'],
    unit: 'Premium Agarbatti', size: '20 sticks', kind: 'Agarbatti'
  };

  const base = [
    { id: 'royal-oud', t: PERF, name: 'Royal Oud', tags: 'Eau de Parfum | 50ml', price: 2499, mrp: 3499, rating: 4.8, reviews: 124, img: 'images/royal-oud.jpg', tag: 'BESTSELLER',
      short: 'An exquisite blend of rare oud, warm spices and woody notes. Royal Oud is crafted for those who appreciate timeless luxury and elegance.',
      about: 'Royal Oud is a luxurious fragrance that captures the essence of the Orient. Deep and mysterious, it opens with rich oud, blended with warm spices and earthy woods. Perfect for evening wear and special occasions, this scent leaves a lasting impression.',
      notes: [['Top Note', 'Saffron & Bergamot', 'images/note-top.jpg'], ['Heart Note', 'Oud & Rose', 'images/note-heart.jpg'], ['Base Note', 'Amber & Musk', 'images/note-base.jpg']],
      ing: 'Alcohol denat., Parfum, Aqua, Oud extract, Saffron extract, Bergamot oil, Rose absolute, Amber, Musk. Dermatologically tested.' },

    { id: 'blush-bloom', t: PERF, name: 'Blush Bloom', tags: 'Floral · Fruity · Musk', price: 1999, rating: 4.8, reviews: 124, img: 'images/blush-bloom.jpg', tag: 'NEW',
      short: 'A romantic bouquet of blooming flowers, ripe fruits and soft musk – light, feminine and effortlessly elegant.',
      about: 'Blush Bloom opens with juicy pear and peach, unfolds into rose and peony, and settles into a creamy musk base. A day-to-evening fragrance that feels like a soft, warm embrace.',
      notes: [['Top Note', 'Pear & Peach', 'bi-brightness-alt-high'], ['Heart Note', 'Rose & Peony', 'bi-flower1'], ['Base Note', 'White Musk', 'bi-cloud']] },

    { id: 'midnight-oud', t: PERF, name: 'Midnight Oud', tags: 'Woody · Amber · Spicy', price: 2499, rating: 4.7, reviews: 98, img: 'images/midnight-oud.jpg', tag: 'POPULAR',
      short: 'A dark, mysterious blend of smoky oud, amber and warm spices for confident evenings.',
      about: 'Midnight Oud is bold and magnetic. Cardamom and black pepper lead into smoky oud and cedar, resting on a warm amber and vanilla base that lingers long after you leave.',
      notes: [['Top Note', 'Cardamom & Pepper', 'bi-fire'], ['Heart Note', 'Oud & Cedar', 'bi-tree'], ['Base Note', 'Amber & Vanilla', 'bi-moon-stars']] },

    { id: 'royal-essence', t: PERF, name: 'Royal Essence', tags: 'Oriental · Spicy · Warm', price: 2999, rating: 4.9, reviews: 156, img: 'images/royal-essence.jpg', tag: 'TOP RATED',
      short: 'A regal oriental fragrance with golden saffron, spices and resins – warm, rich and unforgettable.',
      about: 'Royal Essence is crafted for special occasions. Saffron and cinnamon sparkle on top, a heart of jasmine and labdanum glows in the middle, and a deep base of amber and sandalwood lasts all night.',
      notes: [['Top Note', 'Saffron & Cinnamon', 'bi-stars'], ['Heart Note', 'Jasmine & Labdanum', 'bi-flower2'], ['Base Note', 'Amber & Sandalwood', 'bi-gem']] },

    { id: 'citrus-fresh', t: PERF, name: 'Citrus Fresh', tags: 'Citrus · Green · Aromatic', price: 1799, rating: 4.6, reviews: 87, img: 'images/citrus-fresh.jpg',
      short: 'A sparkling burst of citrus and green leaves – clean, energising and perfect for everyday wear.',
      about: 'Citrus Fresh is a morning in a bottle. Lemon, lime and mandarin meet green tea and basil, then dry down into light cedar and musk.',
      notes: [['Top Note', 'Lemon & Lime', 'bi-brightness-high'], ['Heart Note', 'Green Tea & Basil', 'bi-leaf'], ['Base Note', 'Cedar & Musk', 'bi-wind']] },

    { id: 'midnight-bloom', t: PERF, name: 'Midnight Bloom', tags: 'Eau de Parfum | 50ml', price: 2299, mrp: 3199, rating: 4.7, reviews: 98, img: 'images/midnight-bloom.jpg',
      short: 'Night-blooming jasmine wrapped in dark woods and soft musk – elegant and quietly seductive.',
      about: 'Midnight Bloom pairs white jasmine and tuberose with smoky woods. A refined evening scent with great sillage.',
      notes: [['Top Note', 'Mandarin & Pink Pepper', 'bi-brightness-alt-high'], ['Heart Note', 'Jasmine & Tuberose', 'bi-flower1'], ['Base Note', 'Woods & Musk', 'bi-moon-stars']] },

    { id: 'velvet-rose', t: PERF, name: 'Velvet Rose', tags: 'Eau de Parfum | 50ml', price: 2199, mrp: 2999, rating: 4.6, reviews: 87, img: 'images/velvet-rose.jpg',
      short: 'Lush Damask rose softened with raspberry and a velvety vanilla base.',
      about: 'Velvet Rose is a modern take on a classic: dewy rose petals, a hint of raspberry and a smooth, powdery vanilla dry-down.',
      notes: [['Top Note', 'Raspberry & Lychee', 'bi-heart'], ['Heart Note', 'Damask Rose', 'bi-flower1'], ['Base Note', 'Vanilla & Musk', 'bi-cloud']] },

    { id: 'sandalwood-serenity', t: PERF, name: 'Sandalwood Serenity', tags: 'Eau de Parfum | 50ml', price: 1999, mrp: 2699, rating: 4.5, reviews: 76, img: 'images/sandalwood.jpg',
      short: 'Creamy Mysore-style sandalwood with warm spice – calming, grounding and timeless.',
      about: 'Sandalwood Serenity brings together creamy sandalwood, cardamom and a touch of cinnamon for a warm, meditative scent.',
      notes: [['Top Note', 'Cardamom', 'bi-brightness-alt-high'], ['Heart Note', 'Sandalwood & Cinnamon', 'bi-tree'], ['Base Note', 'Amber & Vanilla', 'bi-moon-stars']] },

    { id: 'fresh-citrus', t: PERF, name: 'Fresh Citrus', tags: 'Eau de Parfum | 50ml', price: 1799, mrp: 2499, rating: 4.4, reviews: 69, img: 'images/fresh-citrus.jpg',
      short: 'Juicy orange, lime and lemon over a soft green, woody base – bright and uplifting.',
      about: 'Fresh Citrus is sunny and light, made for warm days and an active lifestyle. It dries down to a clean, woody musk.',
      notes: [['Top Note', 'Orange & Lime', 'bi-brightness-high'], ['Heart Note', 'Lemon Zest & Mint', 'bi-leaf'], ['Base Note', 'Light Woods', 'bi-wind']] },

    { id: 'chandan', t: AGAR, name: 'Chandan', tags: 'Calming & Pure', price: 120, rating: 4.7, reviews: 210, img: 'images/chandan.jpg',
      short: 'Classic sandalwood agarbatti that calms the mind and fills your home with a pure, woody fragrance.',
      about: 'Hand-rolled with real sandalwood powder, Chandan agarbatti is ideal for daily prayers, meditation and yoga.',
      notes: [['Top Note', 'Sandalwood', 'bi-tree'], ['Heart Note', 'Vetiver', 'bi-leaf'], ['Base Note', 'Musk', 'bi-cloud']] },

    { id: 'mogra', t: AGAR, name: 'Mogra', tags: 'Fresh & Floral', price: 120, rating: 4.6, reviews: 154, img: 'images/mogra.jpg',
      short: 'The sweet, fresh scent of jasmine blossoms – light, floral and uplifting.',
      about: 'Mogra agarbatti captures the evening fragrance of freshly picked jasmine, perfect for living rooms and festive decor.',
      notes: [['Top Note', 'Green Leaves', 'bi-leaf'], ['Heart Note', 'Jasmine', 'bi-flower1'], ['Base Note', 'Soft Woods', 'bi-tree']] },

    { id: 'rose', t: AGAR, name: 'Rose', tags: 'Soothing & Sweet', price: 120, rating: 4.8, reviews: 189, img: 'images/rose.jpg',
      short: 'Sweet rose petals blended into a soothing incense for a warm and romantic ambience.',
      about: 'Rose agarbatti is made with rose petal extract and natural resins. A gentle fragrance that soothes the senses.',
      notes: [['Top Note', 'Rose Petals', 'bi-flower1'], ['Heart Note', 'Rose Absolute', 'bi-heart'], ['Base Note', 'Sweet Resin', 'bi-droplet']] },

    { id: 'lavender', t: AGAR, name: 'Lavender', tags: 'Relaxing & Calm', price: 120, rating: 4.5, reviews: 132, img: 'images/lavender.jpg',
      short: 'Calming lavender incense that helps you unwind after a long day.',
      about: 'Lavender agarbatti brings herbal, floral calm to your bedroom, study or meditation corner.',
      notes: [['Top Note', 'Lavender Buds', 'bi-flower2'], ['Heart Note', 'Herbal Notes', 'bi-leaf'], ['Base Note', 'Soft Musk', 'bi-cloud']] }
  ];

  window.PRODUCTS = base.map(p => ({
    ...p,
    type: p.t.kind === 'Perfume' ? 'perfume' : 'agarbatti',
    sub: p.t.kind === 'Perfume' ? 'Luxury Eau de Parfum' : 'Premium Agarbatti',
    feats: p.t.feats,
    ing: p.ing || p.t.ing,
    how: p.t.how,
    size: p.t.size
  }));
  window.RELATED_ROYAL = ['midnight-bloom', 'velvet-rose', 'sandalwood-serenity', 'fresh-citrus'];
})();
