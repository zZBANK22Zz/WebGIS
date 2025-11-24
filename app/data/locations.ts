export type Category = 'academic' | 'services';

export interface Location {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  position: {
    lat: number;
    lng: number;
  };
  description: string;
  descriptionEn: string;
  image: string;
  openingHours?: string;
  website?: string;
}

export const categories = {
  academic: {
    name: 'อาคารเรียน',
    nameEn: 'Academic Buildings',
    color: '#1e40af', // Blue
    icon: '🏛️',
  },
  services: {
    name: 'บริการนักศึกษา',
    nameEn: 'Student Services',
    color: '#059669', // Green
    icon: '🏢',
  },
};

export const locations: Location[] = [
  {
    id: 'library',
    name: 'ห้องสมุด',
    nameEn: 'Library',
    category: 'academic',
    position: { lat: 7.893413655948644, lng: 98.35350079923705 }, //7.893413655948644, 98.35350079923705
    description: 'ห้องสมุดกลางของมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต มีหนังสือและทรัพยากรการเรียนรู้มากมาย พร้อมพื้นที่อ่านหนังสือที่เงียบสงบ',
    descriptionEn: 'Central library of PSU Phuket Campus with extensive collection of books and learning resources, featuring quiet study areas.',
    image: 'https://lh3.googleusercontent.com/p/AF1QipOwglHXjhKNaUaMKroQMHmduvFTjmvdLm9msoxN=w453-h240-k-no',
    openingHours: 'จันทร์-ศุกร์: 08:00 - 20:00 น.\nเสาร์-อาทิตย์: 09:00 - 17:00 น.',
    website: 'https://www.phuket.psu.ac.th',
  },
  {
    id: 'lecture-hall',
    name: 'อาคารเรียนรวม',
    nameEn: 'Lecture Hall',
    category: 'academic',
    position: { lat: 7.8933782770727525, lng: 98.35226862153574 },//7.8933782770727525, 98.35226862153574
    description: 'อาคารเรียนรวมขนาดใหญ่สำหรับการบรรยายและกิจกรรมทางวิชาการต่างๆ มีห้องบรรยายหลายห้องพร้อมอุปกรณ์การสอนที่ทันสมัย',
    descriptionEn: 'Large lecture hall building for lectures and academic activities, featuring multiple lecture rooms with modern teaching equipment.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwlSTeyPWi8WxabjMqqM0d2A34WAcHioiz61Ji4xA_Rcdm1-KkDt57_Z7pgOpacnJV21RJeDh5wFi4dS1ILWaL0cD5bKubUqkUPDWx9J7KLyLjWmOaRDzvhFoTTQSapCwjn-zu0=w408-h544-k-no',
    openingHours: 'จันทร์-ศุกร์: 07:00 - 20:00 น.',
    website: 'https://www.phuket.psu.ac.th',
  },
  {
    id: 'cafeteria',
    name: 'โรงอาหาร',
    nameEn: 'Cafeteria',
    category: 'services',
    position: { lat: 7.892625093648484, lng: 98.3520486519439 }, //7.892625093648484, 98.3520486519439
    description: 'โรงอาหารกลางของมหาวิทยาลัย มีอาหารหลากหลายให้เลือกทั้งอาหารไทยและอาหารนานาชาติ ในราคาที่เหมาะสมสำหรับนักศึกษา',
    descriptionEn: 'Central cafeteria offering diverse food options including Thai and international cuisine at student-friendly prices.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwg_xwqQAwTkFdcWQrE75ccTp1tQcaOxqSnjQQJlt7q6Vj3tV2YJ0U2qr5MQdiJQoaxTXiGF0W_ik8atalreLX_e1B5jAWHBlNmSHsLGsif6MDFQSUV9XwYvE5wYQjSVtitG3VBkw=w408-h306-k-no',
    openingHours: 'จันทร์-ศุกร์: 07:00 - 19:00 น.\nเสาร์-อาทิตย์: 08:00 - 18:00 น.',
    website: 'https://www.phuket.psu.ac.th',
  },
  {
    id: 'dormitory',
    name: 'หอพัก',
    nameEn: 'Dormitory',
    category: 'services',
    position: { lat: 7.892384698944567, lng: 98.35501792835218 }, //7.892384698944567, 98.35501792835218
    description: 'หอพักนักศึกษาที่สะดวกสบายและปลอดภัย มีห้องพักพร้อมสิ่งอำนวยความสะดวกพื้นฐานครบครัน อยู่ใกล้กับพื้นที่เรียน',
    descriptionEn: 'Comfortable and secure student dormitory with well-equipped rooms and basic amenities, located close to academic areas.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwGVrDxeqqOrBBP3KZ3BRcvebaQ0d9AuVRFbju_lGUV3qYgc5sgvuA-uzN3Mk-AZWZ0guuCNjTwgjClFPsyTxMDR1PsTATVhRamdTVkywoWklQYYYqb--90Ti5lJFTwT4CxZOE3-NfCx51d=w408-h306-k-no',
    openingHours: 'เปิดบริการตลอด 24 ชั่วโมง',
    website: 'https://www.phuket.psu.ac.th',
  },
  {
    id: 'sports-center',
    name: 'ศูนย์กีฬา',
    nameEn: 'Sports Center',
    category: 'services',
    position: { lat: 7.8966308229910425, lng: 98.35254334108978 }, //7.8966308229910425, 98.35254334108978
    description: 'ศูนย์กีฬาที่มีอุปกรณ์และสนามกีฬาครบครัน รวมถึงสนามฟุตบอล สนามบาสเกตบอล และห้องออกกำลังกาย',
    descriptionEn: 'Comprehensive sports center with full facilities including football field, basketball court, and fitness room.',
    image: 'https://lh3.googleusercontent.com/p/AF1QipNSWd0einhJNkZbrvBgF6MXX9pUxDAoMzUNnnL8=w408-h271-k-no',
    openingHours: 'จันทร์-ศุกร์: 06:00 - 21:00 น.\nเสาร์-อาทิตย์: 08:00 - 20:00 น.',
    website: 'https://www.phuket.psu.ac.th',
  },
  {
    id: 'admin-building',
    name: 'อาคารบริหาร',
    nameEn: 'Administration Building',
    category: 'academic',
    position: { lat: 7.894506993642926, lng: 98.35287624950078 }, //7.894506993642926, 98.35287624950078
    description: 'อาคารสำนักงานบริหารของวิทยาเขต เป็นที่ตั้งของหน่วยงานต่างๆ เช่น สำนักทะเบียน และงานบริการนักศึกษา',
    descriptionEn: 'Administrative building housing various offices including Registrar and Student Services.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxODc9Bglo_3ecn6CW6O7gfHUbWg644Vx7IWajiJMO0mkmv1ugoiCATThrcbSkcFbaMaFySmARDV28RCxIerUsxoI-5t-_NeStuY7HeVx8H-ZN43qugK86j4WbkWtqG4n_qGViWFQ=w408-h271-k-no',
    openingHours: 'จันทร์-ศุกร์: 08:30 - 16:30 น.',
    website: 'https://www.phuket.psu.ac.th',
  },
];

// ฟังก์ชันสร้างจุดกลางระหว่างสองจุดเพื่อให้เส้นทางดูเหมือนเส้นทางเดินจริง
const createIntermediatePoints = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  numPoints: number = 2
): { lat: number; lng: number }[] => {
  const points: { lat: number; lng: number }[] = [];
  
  for (let i = 1; i <= numPoints; i++) {
    const ratio = i / (numPoints + 1);
    // เพิ่มการเบี่ยงเบนเล็กน้อยเพื่อให้เส้นทางดูเป็นธรรมชาติ
    const offset = Math.sin(ratio * Math.PI) * 0.0001; // เบี่ยงเบนเล็กน้อย
    
    points.push({
      lat: start.lat + (end.lat - start.lat) * ratio + offset,
      lng: start.lng + (end.lng - start.lng) * ratio + offset * 0.5,
    });
  }
  
  return points;
};

// สร้างเส้นทางแนะนำที่ดูเหมือนเส้นทางเดินจริง
const library = locations.find(loc => loc.id === 'library')!.position;
const lectureHall = locations.find(loc => loc.id === 'lecture-hall')!.position;
const sportsCenter = locations.find(loc => loc.id === 'sports-center')!.position;

// สร้างเส้นทาง: Library → Lecture Hall → Sports Center
// เพิ่มจุดกลางระหว่างแต่ละคู่เพื่อให้เส้นทางดูเป็นธรรมชาติ
const routePoints: { lat: number; lng: number }[] = [library];

// เพิ่มจุดกลางระหว่าง Library และ Lecture Hall
routePoints.push(...createIntermediatePoints(library, lectureHall, 2));
routePoints.push(lectureHall);

// เพิ่มจุดกลางระหว่าง Lecture Hall และ Sports Center
routePoints.push(...createIntermediatePoints(lectureHall, sportsCenter, 3));
routePoints.push(sportsCenter);

export const recommendedRoute = routePoints;

// ข้อมูลเส้นทางสำหรับแสดงใน UI
export const routeInfo = {
  name: 'เส้นทางเดินชมมหาวิทยาลัย',
  nameEn: 'Campus Walking Tour',
  stops: [
    { id: 'library', name: 'ห้องสมุด', nameEn: 'Library' },
    { id: 'lecture-hall', name: 'อาคารเรียนรวม', nameEn: 'Lecture Hall' },
    { id: 'sports-center', name: 'ศูนย์กีฬา', nameEn: 'Sports Center' },
  ],
  estimatedTime: 'ประมาณ 15-20 นาที',
  distance: 'ประมาณ 500 เมตร',
};

