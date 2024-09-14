import "./MelodyEnglishSchool.css";
import React, { useState } from "react";
import portrait from "./images/portrait.jpg";
import logoImage from "./images/melodylogo.png";
import translations from "./translations.json";

const EnglishTeacherWebsite = () => {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form will be handled by Netlify
  };

  const t = translations[language];

  const basePrice = {
    singleClass: 30,
    monthly: 80,
  };

  const exchangeRates = {
    USD: 1,
    JPY: 140.84,
    TWD: 31.95,
    CNY: 7.09,
  };

  const calculatePrice = (baseAmount, currency) => {
    return Math.round(baseAmount * exchangeRates[currency]);
  };

  const prices = {
    USD: {
      singleClass: basePrice.singleClass,
      monthly: basePrice.monthly,
      savings: Math.abs(basePrice.monthly - basePrice.singleClass * 4),
    },
    JPY: {
      singleClass: calculatePrice(basePrice.singleClass, "JPY"),
      monthly: calculatePrice(basePrice.monthly, "JPY"),
      savings: Math.abs(
        calculatePrice(basePrice.monthly - basePrice.singleClass * 4, "JPY")
      ),
    },
    TWD: {
      singleClass: calculatePrice(basePrice.singleClass, "TWD"),
      monthly: calculatePrice(basePrice.monthly, "TWD"),
      savings: Math.abs(
        calculatePrice(basePrice.monthly - basePrice.singleClass * 4, "TWD")
      ),
    },
    CNY: {
      singleClass: calculatePrice(basePrice.singleClass, "CNY"),
      monthly: calculatePrice(basePrice.monthly, "CNY"),
      savings: Math.abs(
        calculatePrice(basePrice.monthly - basePrice.singleClass * 4, "CNY")
      ),
    },
  };

  const currencySymbols = {
    USD: "$",
    JPY: "¥",
    TWD: "NT$",
    CNY: "¥",
  };

  const getCurrencySymbol = (curr) => currencySymbols[curr] || "";

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo-container">
            <img src={logoImage} alt="Melody English School Logo" />
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <a href="#about">{t.about}</a>
              </li>
              <li>
                <a href="#courses">{t.courses}</a>
              </li>
              <li>
                <a href="#resources">{t.resources}</a>
              </li>
              <li>
                <a href="#contact">{t.contact}</a>
              </li>
            </ul>
            <div className="language-currency">
              <select
                onChange={handleLanguageChange}
                value={language}
                className="language-select"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
              <select
                onChange={handleCurrencyChange}
                value={currency}
                className="currency-select"
              >
                <option value="USD">USD</option>
                <option value="TWD">TWD</option>
                <option value="JPY">JPY</option>
                <option value="CNY">CNY</option>
              </select>
            </div>
          </nav>
        </div>
      </header>

      <main className="main container">
        <section id="about" className="section">
          <div className="about-content">
            <img src={portrait} alt="Melody" className="profile-image" />
            <div>
              <h2>{t.welcome}</h2>
              <p>{t.introduction}</p>
            </div>
          </div>
        </section>

        <section id="courses" className="section">
          <h2>{t.classOptions}</h2>
          <div className="courses-grid">
            <div className="course-card">
              <h3>{t.singleClass}</h3>
              <p>{t.singleClassDesc}</p>
              <ul>
                <li>✓ {t.session}</li>
                <li>✓ {t.personalizedLesson}</li>
                <li>✓ {t.flexibleScheduling}</li>
              </ul>
              <p className="price">
                {getCurrencySymbol(currency)}
                {prices[currency].singleClass} {t.perClass}
              </p>
              <button className="cta-button">{t.bookNow}</button>
            </div>
            <div className="course-card">
              <h3>{t.monthlySubscription}</h3>
              <p>{t.monthlySubscriptionDesc}</p>
              <ul>
                <li>✓ {t.fourClasses}</li>
                <li>✓ {t.session}</li>
                <li>✓ {t.personalizedCurriculum}</li>
                <li>✓ {t.progressTracking}</li>
                <li>✓ {t.discountedRate}</li>
              </ul>
              <p className="price">
                {getCurrencySymbol(currency)}
                {prices[currency].monthly} {t.perMonth}
              </p>
              <p className="savings">
                ({t.save} {getCurrencySymbol(currency)}
                {prices[currency].savings} {t.comparedTo})
              </p>
              <button className="cta-button">{t.subscribe}</button>
            </div>
          </div>
        </section>

        <section id="resources" className="section">
          <h2>{t.learningResources}</h2>
          <ul>
            <li>{t.textbooks}</li>
            <li>{t.grammarExercises}</li>
            <li>{t.writingPrompts}</li>
            <li>{t.vocabularyLists}</li>
          </ul>
        </section>

        <section id="contact" className="section">
          <h2>{t.contactMe}</h2>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label htmlFor="name">{t.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">{t.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formState.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="cta-button">
              {t.send}
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2024 {t.title} {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnglishTeacherWebsite;
