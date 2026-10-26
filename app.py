import streamlit as st
import requests

# Formspree endpoint — Gyanora Hub contact form
FORMSPREE_ENDPOINT = "https://formspree.io/f/xeaaagae"

# वेब पेज की बेसिक सेटिंग्स (Page Configuration)
st.set_page_config(
    page_title="Gyanora Hub - ज्ञान से सफलता तक का सफर",
    page_icon="🎓",
    layout="wide"
)

# कस्टम CSS स्टाइलिंग (Custom Styling)
st.markdown("""
    <style>
    .main-title {
        font-size: 40px;
        color: #1E3A8A;
        text-align: center;
        font-weight: bold;
    }
    .tagline {
        font-size: 22px;
        color: #D97706;
        text-align: center;
        margin-bottom: 30px;
    }
    .section-header {
        font-size: 26px;
        color: #0F172A;
        border-bottom: 2px solid #D97706;
        padding-bottom: 5px;
        margin-top: 20px;
    }
    .card {
        background-color: #F8FAFC;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #1E3A8A;
        margin-bottom: 15px;
    }
    </style>
""", unsafe_allow_html=True)

# हेडर सेक्शन (Header Section)
st.markdown("<h1 class='main-title'>GYANORA HUB</h1>", unsafe_allow_html=True)
st.markdown("<h3 class='tagline'>— ज्ञान से सफलता तक का सफर —</h3>", unsafe_allow_html=True)
st.write("---")

# साइडबार नेविगेशन (Sidebar Navigation)
st.sidebar.title("नेविगेशन (Navigation)")
menu = st.sidebar.radio(
    "मुख्य अनुभाग चुनिए:",
    [
        "1. हमारे बारे में (About Us)",
        "2. Education & Online Courses",
        "3. AI Services & Agents",
        "4. Website Design & Dev",
        "5. Business Automation",
        "6. SEO & Growth",
        "7. Digital Marketing & Branding",
        "8. CRM & Infrastructure",
        "9. संपर्क करें (Contact Us)"
    ]
)

# 1. हमारे बारे में
if menu == "1. हमारे बारे में (About Us)":
    st.markdown("<h2 class='section-header'>हमारे बारे में (About Us)</h2>", unsafe_allow_html=True)
    st.write("""
    **Gyanora Hub** एक एजुकेशन और डिजिटल सर्विस प्लेटफॉर्म है, जिसका उद्देश्य लोगों, विद्यार्थियों, शिक्षकों, छोटे-बड़े व्यवसायों और संस्थानों को आधुनिक तकनीक, आर्टिफिशियल इंटेलिजेंस (AI) और डिजिटल सेवाओं से जोड़ना है।

    हमारा उद्देश्य केवल डिजिटल जानकारी देना नहीं, बल्कि लोगों को व्यावहारिक कौशल सिखाना, उनके काम को आसान बनाना और उन्हें डिजिटल दुनिया में आगे बढ़ने के अवसर प्रदान करना है।
    """)

    st.info("🎯 **हमारा विजन:** सीखने से लेकर डिजिटल निर्माण और बिजनेस ग्रोथ तक, एक ही प्लेटफॉर्म पर उपयोगी समाधान उपलब्ध कराना।")

# 2. Education & Online Courses
elif menu == "2. Education & Online Courses":
    st.markdown("<h2 class='section-header'>शिक्षा एवं ऑनलाइन प्रशिक्षण (Education & Courses)</h2>", unsafe_allow_html=True)
    st.write("हम तकनीकी शिक्षा एवं कौशल विकास से जुड़े कई कोर्स प्रदान कर रहे हैं:")
    
    courses = [
        "Artificial Intelligence (AI) की बेसिक से एडवांस जानकारी",
        "ChatGPT, Google Gemini और अन्य AI टूल्स का व्यावहारिक उपयोग",
        "AI से फोटो, ग्राफिक्स, कंटेंट और वीडियो तैयार करना",
        "वेबसाइट डिजाइनिंग एवं नो-कोड (No-Code) ऐप डेवलपमेंट",
        "AI Agents और n8n Business Automation की ट्रेनिंग",
        "डिजिटल मार्केटिंग, SEO और YouTube चैनल विकास",
        "फ्रीलांसिंग एवं ऑनलाइन सर्विस बिजनेस की शुरुआती ट्रेनिंग"
    ]
    
    for course in courses:
        st.markdown(f"✅ {course}")
        
    st.warning("📌 **नोट:** जो कोर्स अभी शुरू नहीं हुए हैं, उन्हें 'Coming Soon' या 'Upcoming Courses' के रूप में दिखाया जाएगा।")

# 3. AI Services & Agents
elif menu == "3. AI Services & Agents":
    st.markdown("<h2 class='section-header'>आर्टिफिशियल इंटेलिजेंस सेवाएँ (AI Services)</h2>", unsafe_allow_html=True)
    
    col1, col2 = st.columns(2)
    with col1:
        st.markdown("""
        <div class='card'>
        <h4>🤖 AI Solutions</h4>
        <ul>
            <li>AI Chatbot & Assistant Setup</li>
            <li>AI Agent Development</li>
            <li>Customer Support AI Solutions</li>
        </ul>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown("""
        <div class='card'>
        <h4>📝 Content & Workflows</h4>
        <ul>
            <li>AI Content Generation Workflows</li>
            <li>AI आधारित ग्राहक सहायता & FAQs</li>
            <li>AI टूल्स की ट्रेनिंग और कंसल्टेशन</li>
        </ul>
        </div>
        """, unsafe_allow_html=True)

# 4. Website Design & Dev
elif menu == "4. Website Design & Dev":
    st.markdown("<h2 class='section-header'>वेबसाइट डिजाइनिंग एवं डेवलपमेंट</h2>", unsafe_allow_html=True)
    st.write("हम आपके बिजनेस के लिए आधुनिक एवं रेस्पॉन्सिव वेबसाइट बनाते हैं:")
    
    col1, col2 = st.columns(2)
    with col1:
        st.write("• Business & Portfolio Websites")
        st.write("• Educational & Coaching Websites")
        st.write("• Landing Pages & News Websites")
        st.write("• Digital Catalogue Websites")
    with col2:
        st.write("• WhatsApp Chat Integration")
        st.write("• AI Chatbot / Agent Integration")
        st.write("• Domain, Hosting & Basic SEO")
        st.write("• Website Update & Maintenance")

# 5. Business Automation
elif menu == "5. Business Automation":
    st.markdown("<h2 class='section-header'>बिजनेस ऑटोमेशन (Automation & Workflows)</h2>", unsafe_allow_html=True)
    st.write("बार-बार किए जाने वाले डिजिटल कार्यों को स्वचािलत करें:")
    
    st.write("- **n8n Workflow Automation:** ऑटोमेटेड डेटा फ्लो।")
    st.write("- **Lead Collection & Follow-up:** फॉर्म भरते ही ऑटोमैटिक नोटिफिकेशन और ईमेल।")
    st.write("- **Appointment Booking Workflow:** बुकिंग और रिमाइंडर की सुविधा।")
    st.write("- **Google Sheets & CRM Integration:** डेटा को सही तरीके से मैनेज करना।")

# 6. SEO & Growth
elif menu == "6. SEO & Growth":
    st.markdown("<h2 class='section-header'>SEO एवं YouTube/Social Growth</h2>", unsafe_allow_html=True)
    
    tab1, tab2, tab3 = st.tabs(["Search Engine Optimization", "YouTube Setup & SEO", "Social Media Management"])
    
    with tab1:
        st.write("• On-Page & Technical SEO Audit")
        st.write("• Keyword Research & Content Planning")
        st.write("• Google Search Console & Analytics Setup")
    with tab2:
        st.write("• YouTube Channel Setup & Branding")
        st.write("• Video Title, Description & Tag Optimization")
        st.write("• Shorts/Reels Content Strategy")
    with tab3:
        st.write("• Facebook & Instagram Account Setup")
        st.write("• Content Calendar & Post Planning")
        st.write("• Bio, Captions & Hashtag Strategy")

# 7. Digital Marketing & Branding
elif menu == "7. Digital Marketing & Branding":
    st.markdown("<h2 class='section-header'>डिजिटल मार्केटिंग एवं ब्रांडिंग (Branding & Ads)</h2>", unsafe_allow_html=True)
    st.write("• **Graphic Design:** लोगो (Logo), विजिटिंग कार्ड, बैनर, और ब्रोशर डिजाइन।")
    st.write("• **Video Editing:** Reels, Shorts, और YouTube वीडियो एडिटिंग।")
    st.write("• **Local Digital Presence:** Google Business Profile setup और Local SEO।")
    st.write("• **WhatsApp Business:** कैटलॉग सेट करने और ऑटो रिप्लाई की व्यवस्था।")

# 8. CRM & Infrastructure
elif menu == "8. CRM & Infrastructure":
    st.markdown("<h2 class='section-header'>तकनीकी सहायता एवं बिजनेस डिजिटलाइजेशन</h2>", unsafe_allow_html=True)
    st.write("• **Domain & Hosting:** SSL, वेब डिप्लॉयमेंट और क्लाउड टूल्स सेट करना।")
    st.write("• **CRM & Lead Management:** Chatwoot लाइव चैट और लीड ट्रैकिंग।")
    st.write("• **Business Digitalization:** पारंपरिक दुकानों और व्यवसायों को ऑनलाइन प्लेटफॉर्म पर लाना।")

# 9. संपर्क करें
elif menu == "9. संपर्क करें (Contact Us)":
    st.markdown("<h2 class='section-header'>संपर्क करें (Get in Touch)</h2>", unsafe_allow_html=True)
    st.markdown("""
    **Direct Contact (icon par click karein — number khud dial hoga, screen par number nahi dikhega):**
    - 📞 Call: [📞](tel:8171643770 "Call 8171643770") | [📞](tel:9259680648 "Call 9259680648")
    - 💬 WhatsApp: [💬](https://wa.me/918171643770 "WhatsApp 8171643770") | [💬](https://wa.me/919259680648 "WhatsApp 9259680648")
    - ✉️ Email: [apkaapnanewslive24@gmail.com](mailto:apkaapnanewslive24@gmail.com)
    """)
    
    with st.form("contact_form"):
        name = st.text_input("आपका नाम (Full Name)")
        email = st.text_input("ईमेल आईडी (Email)")
        phone = st.text_input("फोन/व्हाट्सएप नंबर (Phone/WhatsApp)")
        service = st.selectbox("सेवा चुनें (Select Service)", [
            "Online Courses", 
            "AI Agent Development", 
            "Website Development", 
            "Automation & n8n", 
            "Digital Marketing / SEO", 
            "अन्य (Other)"
        ])
        message = st.text_area("आपका संदेश (Message)")
        
        submitted = st.form_submit_button("फॉर्म जमा करें (Submit)")
        if submitted:
            if "YOUR_FORM_ID" not in FORMSPREE_ENDPOINT:
                # Formspree par bhejo taaki submission dashboard/email mein aaye
                try:
                    resp = requests.post(
                        FORMSPREE_ENDPOINT,
                        data={
                            "name": name,
                            "email": email,
                            "phone": phone,
                            "service": service,
                            "message": message,
                        },
                        headers={"Accept": "application/json"},
                        timeout=10,
                    )
                    if resp.ok:
                        st.success(f"धन्यवाद {name}! आपका संदेश भेज दिया गया है। Gyanora Hub टीम जल्द ही आपसे संपर्क करेगी।")
                    else:
                        st.error("Form submit nahi ho paya. Kripya dobara try karein.")
                except Exception as ex:
                    st.error(f"Network error: {ex}")
            else:
                st.success(f"धन्यवाद {name}! Gyanora Hub टीम जल्द ही आपसे संपर्क करेगी।")

# फुटर (Footer)
st.write("---")
st.markdown("<p style='text-align: center;'>© Gyanora Hub — ज्ञान से सफलता तक का सफर | सर्वाधिकार सुरक्षित</p>", unsafe_allow_html=True)