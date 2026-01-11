export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: "budget" | "mid-range" | "premium" | "professional";
  specs: {
    setup: string;
    speakers: string;
    audioFormat: string;
    maxPower: string;
    roomSize: string;
  };
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "CinemaStart 2.1",
    price: "$899 - $1,299",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=400&fit=crop",
    description:
      "Perfect entry point to home theatre with immersive stereo sound",
    category: "budget",
    specs: {
      setup: "2.1 Channel",
      speakers: "Left + Right + Subwoofer",
      audioFormat: "Dolby Digital, DTS",
      maxPower: "300W",
      roomSize: "Small to Medium (10-15 sq meters)",
    },
    features: [
      "Easy plug-and-play setup",
      "Compact speaker design",
      "Powerful subwoofer",
      "Multiple input options",
      "Affordable price point",
    ],
  },
  {
    id: "2",
    name: "SurroundPro 5.1",
    price: "$2,499 - $3,999",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=400&fit=crop",
    description:
      "True surround sound experience with five channels of directional audio",
    category: "mid-range",
    specs: {
      setup: "5.1 Channel",
      speakers: "Front Left/Center/Right + Rear Surrounds + Subwoofer",
      audioFormat: "Dolby Digital, DTS, Dolby Atmos prep",
      maxPower: "800W",
      roomSize: "Medium to Large (15-30 sq meters)",
    },
    features: [
      "Full surround sound",
      "Immersive rear channels",
      "Premium speaker construction",
      "Wireless connectivity",
      "Calibration tools included",
    ],
  },
  {
    id: "3",
    name: "AtmosPremium 7.1",
    price: "$6,499 - $9,999",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=400&fit=crop",
    description:
      "Cinema-grade system with Dolby Atmos for height channels and premium audio",
    category: "premium",
    specs: {
      setup: "7.1.2 Channel (with Atmos)",
      speakers:
        "Front L/C/R + Side Surrounds + Rear Surrounds + 2x Height + Subwoofer",
      audioFormat: "Dolby Atmos, DTS:X, TrueHD",
      maxPower: "1500W",
      roomSize: "Large (25-50 sq meters)",
    },
    features: [
      "Dolby Atmos height channels",
      "Studio-grade speakers",
      "Wireless satellites",
      "Advanced calibration",
      "Multiple subwoofer support",
      "Premium finish options",
    ],
  },
  {
    id: "4",
    name: "UltraExperience 11.1",
    price: "$15,999 - $29,999+",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=400&fit=crop",
    description:
      "Ultimate home theatre with professional installation and custom configurations",
    category: "professional",
    specs: {
      setup: "11.1.4 Channel (fully customizable)",
      speakers:
        "Triple front array + 4x Surrounds + 4x Heights + Dual Subwoofers + Optional back row",
      audioFormat: "All formats including Immersive Audio",
      maxPower: "3000W+",
      roomSize: "Very Large (40+ sq meters)",
    },
    features: [
      "Fully customizable configuration",
      "Professional installation included",
      "Reference-grade components",
      "Custom speaker matching",
      "Advanced room acoustics",
      "Professional calibration",
      "Wireless and wired options",
      "Smart home integration",
    ],
  },
];
