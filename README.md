# PSU Phuket Virtual Campus Tour

แผนที่ออนไลน์และ Virtual Campus Tour สำหรับมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต (Prince of Songkla University, Phuket Campus)

## คุณสมบัติ

- ✅ แผนที่ออนไลน์แบบ Interactive ด้วย Google Maps
- ✅ หมวดหมู่สถานที่ 2 ประเภท (อาคารเรียน และ บริการนักศึกษา)
- ✅ สถานที่มากกว่า 5 จุดพร้อมข้อมูลครบถ้วน
- ✅ เส้นทางแนะนำสำหรับการเดินเที่ยวชม
- ✅ Popup แสดงข้อมูลสถานที่ รูปภาพ เวลาเปิด-ปิด และลิงก์เว็บไซต์
- ✅ รองรับการใช้งานบนมือถือ
- ✅ ออกแบบเป็นทางการเหมาะกับงานวิชาการ

## การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Google Maps API Key

สร้างไฟล์ `.env.local` ในโฟลเดอร์ root ของโปรเจกต์:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**วิธีรับ API Key:**
1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่
3. เปิดใช้งาน Maps JavaScript API
4. สร้าง API Key และคัดลอกมาใส่ในไฟล์ `.env.local`

### 3. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

## โครงสร้างโปรเจกต์

```
app/
├── components/
│   └── CampusMap.tsx      # คอมโพเนนต์แผนที่หลัก
├── data/
│   └── locations.ts       # ข้อมูลสถานที่และหมวดหมู่
├── page.tsx               # หน้าหลัก
├── layout.tsx             # Layout หลัก
└── globals.css            # สไตล์ CSS
```

## เทคโนโลยีที่ใช้

- **Next.js 16** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **@react-google-maps/api** - Google Maps Integration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
