# ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์ ภูเก็ต
## One-Page Sale, Interactive Seat Layout Simulator & Backend Admin CMS

ระบบเว็บไซต์ One-Page Sale และระบบจัดการเนื้อหาหลังบ้าน (Admin CMS) สำหรับธุรกิจบริการเช่าเหมารถทัวร์ปรับอากาศ 2 ชั้น VIP (40–46 ที่นั่ง) ฐานที่ตั้งจังหวัดภูเก็ต พร้อมให้บริการรับ-ส่งและนำเที่ยวทั่วประเทศไทย ชูจุดเด่น **"เจ้าของขับเองดูแลเองทุกทริป ปลอดภัยระดับ VIP"**

---

### 🌟 ฟีเจอร์เด่นของระบบ (Core Features)

1. **One-Page Sale Architecture (Luxury Emerald & Gold Theme)**
   - ธีมสีเขียวมรกตหรูหรา (`#064E3B`, `#047857`) ตัดขอบทองแชมเปญ VIP (`#D4AF37`)
   - 100% Mobile-First Responsive Design ใช้งานง่ายบนสมาร์ทโฟน แท็บเล็ต และคอมพิวเตอร์
   - Sticky Header & Smooth Navigation นำทางไปยังแต่ละส่วนอย่างลื่นไหล
   - สโลแกนหลัก & สโลแกนทางเลือก ปรับเปลี่ยนได้จากระบบหลังบ้าน

2. **Interactive Bus Seat Layout Simulator (ระบบจำลองผังที่นั่ง 2 ชั้น 40-46 ที่นั่ง)**
   - **สลับดูได้ทั้ง 2 ชั้น:**
     - **ชั้นบน (Upper Deck):** วิวพาโนรามากระจกหน้ากว้าง 180°, ผัง 2-2 (ริมหน้าต่าง/ทางเดิน), บันไดขึ้น-ลง, จอทีวี Smart TV 43 นิ้ว, ทางออกฉุกเฉินบนหลังคา
     - **ชั้นล่าง (Lower Deck):** โซนคนขับ ("เจ้าของขับเอง 100%"), ประตูขึ้น-ลง, โซนที่นั่ง VIP สำหรับผู้บริหาร/ผู้สูงอายุ, ห้องน้ำสะอาดถูกสุขอนามัยพร้อมอ่างล้างมือ, โซนเก็บสัมภาระใต้ท้องรถ
   - **สลับขนาดความจุ:** รุ่น 40 ที่นั่ง, รุ่น 44 ที่นั่ง, และรุ่น 46 ที่นั่ง
   - **Interactive Tooltip:** คลิกเก้าอี้แต่ละตัวเพื่อดูคุณสมบัติ และมีปุ่ม "เลือกที่นั่งนี้เพื่อขอใบเสนอราคา" ดึงข้อมูลไประบุในฟอร์มอัตโนมัติ

3. **Floating Speed-Dial & Phone Selector Modal**
   - ปุ่มโทรด่วนสีเขียว-ทองลอยมุมขวาล่าง และแถบเมนูด่วนล่างสุดบนหน้าจอมือถือ
   - หน้าต่าง Modal แสดง 2 เบอร์หลัก:
     - 📞 **สายด่วนที่ 1: `096-463-8443`** (สายตรงเจ้าของ)
     - 📞 **สายด่วนที่ 2: `081-059-6350`** (สอบถามคิว/จองรถ)
     - ปุ่มกดโทรออก (`tel:`) และปุ่มกดคัดลอกเบอร์โทร
     - ตรวจจับ Event `Contact` สำหรับ Facebook Pixel และ Facebook CAPI อัตโนมัติ

4. **Quotation Request & Lead Generation Form**
   - ฟอร์มขอใบเสนอราคาด่วน: ชื่อผู้ติดต่อ, เบอร์โทรศัพท์, ต้นทาง, ปลายทาง, วันที่ไป-กลับ, จำนวนผู้โดยสาร, ผังรถ/ที่นั่งที่สนใจ, รายละเอียดเพิ่มเติม
   - บันทึกข้อมูลลงระบบฐานข้อมูลทันที
   - เอฟเฟกต์พลุเฉลิมฉลอง (Confetti Celebration) เมื่อกดส่งข้อมูลสำเร็จ
   - ยิง Event `Lead` ไปยัง Facebook Pixel & Conversions API

5. **Facebook Meta API, Pixel & SEO Integration**
   - Dynamic Open Graph tags (Facebook Feed share thumbnail 1200x630, Meta Title, Description)
   - JSON-LD Structured Data Schema Markup สำหรับประเภท `TravelAgency` และ `LocalBusiness`
   - Facebook Conversions API (CAPI) Endpoint พร้อมใช้งานที่ `/api/facebook/capi`
   - Facebook Graph API Sync สำหรับดึงโพสต์อัปเดตทริปจริงจาก Facebook Page

6. **ระบบจัดการหลังบ้าน (Backend Admin CMS Dashboard)**
   - เข้าใช้งานผ่าน URL: `/admin`
   - ตั้งค่าบัญชีผู้ดูแลผ่าน environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`) ก่อนเริ่มใช้งาน
   - **เมนูจัดการหลังบ้าน:**
     - 📋 **รายการขอใบเสนอราคา (Leads):** ดูรายชื่อลูกค้า, อัปเดตสถานะ (`รอติดต่อกลับ`, `ติดต่อแล้ว`, `เสนอราคาแล้ว`, `จองสำเร็จ`, `ยกเลิก`), โทรหาลูกค้าได้ทันที และพิมพ์บันทึกช่วยจำ
     - ⚙️ **ข้อมูลทั่วไป & สโลแกน (Site Settings):** สลับสโลแกน 3 ทางเลือก หรือพิมพ์เอง, แก้ไขเบอร์โทรศัพท์, Hero Badge, Subtitle, ลิงก์ Line / Facebook
     - 💺 **ผังที่นั่ง & ขนาดรถ (Fleet Configurator):** ตั้งค่าโหมดที่นั่งเริ่มต้น
     - 🖼️ **แกลเลอรี & รีวิว (Gallery & Testimonials):** เพิ่ม/ลบรูปภาพ จัดหมวดหมู่ และจัดการรีวิวจากลูกค้า
     - 📈 **SEO & Facebook API:** แก้ไข Meta Tags, Facebook Pixel ID, Page ID, และ CAPI Access Token

---

### 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Quick Start)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. ตั้งค่าตัวแปรแวดล้อมและฐานข้อมูลตัวอย่าง
cp .env.example .env.local
cp data/db.example.json data/db.json
# แก้ไข .env.local โดยใส่รหัสผ่านที่คาดเดายากและ session secret ของคุณเอง

# 3. รันโหมด Development (พอร์ต 3000)
npm run dev

# 4. รันโหมด Production Build
npm run build
npm run start
```

สร้างค่า `ADMIN_SESSION_SECRET` ที่ปลอดภัยได้ด้วย `openssl rand -base64 32` แล้วใส่ใน `.env.local` ห้าม commit ไฟล์ `.env.local` หรือ `data/db.json` ขึ้น GitHub

เปิดบราวเซอร์ไปที่:
- **หน้าหลัก One-Page Sale:** [http://localhost:3000](http://localhost:3000)
- **ระบบหลังบ้าน Admin CMS:** [http://localhost:3000/admin](http://localhost:3000/admin)
