
# 🚗 CarNest – Ultimate Auto Trade Hub

Welcome to **CarNest**, your one-stop platform for seamless, secure, and FREE car buying and selling. Whether you're a seller listing your vehicle or a buyer searching for the perfect ride, CarNest has you covered. CarNest is a modern e-commerce platform, built with React.js for a fast and interactive user experience.


![CarNest Preview](public/carnest-preview.png)

## 🚀 Welcome Message

🚗 **Welcome to CarNest – Your Ultimate Auto Trade Hub!** 🚗  
Greetings, sellers & buyers!  
Whether you're here to sell your vehicle or find the perfect ride, you've come to the right place. At **CarNest**, we make auto trading seamless, secure, and **100% FREE!**  

✅ **Sellers**: List your vehicles with ease and connect with serious buyers—**at no cost**.  
✅ **Buyers**: Discover top-quality cars at competitive prices, with **no hidden fees**.  
✅ **Fast, Safe, Reliable**: Enjoy a trusted marketplace designed for smooth, free transactions.  

**Start your journey now—because at CarNest, the road to a great deal begins here, with ZERO fees!** 🚀

---

## 🗂️ Project Structure

```
CarNest/
│
├── public/
│   ├── carnest-preview.png         # Site screenshot or preview image
│   └── ...                         # Static files like images or mock data
│
├── src/
│   ├── components/
│   │   ├── CarCard.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ListComponent.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Wishlist.jsx
│   │   └── ApiCars.jsx
│   │
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── README.md                      # ← This file
└── vite.config.js
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/carnest.git
cd carnest
```

2. **Install dependencies**  
```bash
npm install
```

3. **Configure Firebase**  
- Add your Firebase config in `src/firebase.js`

4. **Run the app locally**  
```bash
npm run dev
```

---

## ✅ Features

- 🔒 Firebase Authentication (signup/login)
- 🚘 Add, edit, and delete cars (for admins)
- ❤️ Wishlist management
- 🌐 Real-time Firestore sync with local storage fallback
- 🔍 Search and filter car listings
- 🧾 Admin-only panel with route protection
- 📦 Public mock API cars listing (`ApiCars` page)
- ✨ Responsive UI styled with Tailwind CSS

---

## 👨‍💼 Admin Panel Access

To restrict Admin access:
- Check admin email in `App.jsx`
```js
const adminEmail = 'admin@example.com'; // your admin's email
```
- Route protects `AdminPanel` based on user login

---

## 📸 Preview

![CarNest App Preview](public/carnest-preview.png)

---

## 👤 Author

Built with 💙 by **Oluseyi Olalere**  
Feel free to reach out for collaboration, feedback, or hiring!

---

## 📝 License

This project is open-source and free to use under the MIT license.
