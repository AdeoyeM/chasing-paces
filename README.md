# Chasing Paces 🏃🏾‍♀️


## About

ChasingPaces helps runners bridge the gap between having a race goal and knowing how to train for it. Many runners, especially beginners, train without structure or understanding of pacing - leading to overtraining, undertraining, or missed goals.

This app solves that by converting race goals into clear, actionable pacing guidance.

## 🚀 Quick Start

**Try it live:** [[Chasing Paces](https://chasing-paces.vercel.app/)]

1. Select your race distance (or enter a custom distance)
2. Enter your goal time (hours, minutes, seconds)
3. Choose kilometers or miles
4. Click "Calculate"
5. View your target pace, training zones, splits, and BPM guidance

## Screenshots

### Desktop View
<img src="https://github.com/user-attachments/assets/dff486ca-bfc8-4672-b40e-5668f5261824" alt="Desktop Calculator" width="800"/>

### Mobile View
<p float="left">
  <img src="https://github.com/user-attachments/assets/708b670f-72fa-4be1-a3cf-3af3ff2754a2" alt="Mobile Calculator" width="250"/>
  <img src="https://github.com/user-attachments/assets/910475ff-9d53-41d3-a255-b87e98a0e79e" alt="Mobile Results" width="250"/>
  <img src="https://github.com/user-attachments/assets/cb9d2d0c-6a35-4ef2-aac0-f0c5f717da35" alt="Mobile Zones" width="250"/>
</p>

## Features

### Goal to Pace Calculator
Enter your race distance and goal time to instantly calculate your target pace per kilometer or mile.

**Supported distances:**
- 5K
- 10K
- Half Marathon (21.1km)
- Marathon (42.2km)
- Custom distances

### Training Pace Zones
Get three scientifically-backed training zones based on your goal pace:

- **Easy Pace (60-75% effort):** Build endurance and recover between hard sessions
- **Tempo Pace (85-90% effort):** Improve lactate threshold and race readiness
- **Interval Pace (95-100% effort):** Build speed and VO2 max

### Responsive Design
Works seamlessly on mobile, tablet, and desktop - check your paces on the go or during training.

## Tools & Framework
Tools: 
- [ESLint](https://eslint.org/) - Code linting
- [Jest](https://jestjs.io/) - Unit testing
- [React Testing Library](https://testing-library.com/) - Component testing

Framework:
- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- Custom dark theme with gradient accents

## Installation

**1. Prerequisites:**
- Node.js 18+ 
- npm or yarn

For installation, run the following steps:

**2. Clone the repository**
``` git clone https://github.com/YOUR_USERNAME/chasing-paces.git ```

**3. Navigate to project directory**
``` cd chasing-paces ```

**4. Install dependencies**
``` npm install ```

**5. Then, run the development server**
``` npm run dev ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Available Scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm test         # Run Jest tests
npm test:watch   # Run tests in watch mode
```
## Future phases
For V2 and above, there are plans to implement the following:

**📊 Split Times Table**
View kilometer-by-kilometer or mile-by-mile splits for your race distance to help you pace on race day.

**🎵 BPM Suggestions**
Get music tempo (beats per minute) recommendations that match your target pace to stay motivated and maintain rhythm.

**Backend and database implementation**
The app calculation logic will remain client side for instant results. 
However, there will be a backend implementation for saving users results.

At this point in time, simplicity is prioritised over complexity

## Contributing

This is a portfolio/learning project, but feedback and suggestions are welcome!

**Found a bug?** [Open an issue](https://github.com/AdeoyeM/chasing-paces/issues)

**Have a feature idea?** [Start a discussion](https://github.com/AdeoyeM/chasing-paces/discussions)

## License

MIT License - feel free to use this code for learning purposes.

## About the Developer

Built by Misty Adeoye as part of the Monzo x Coding Black Females Mentorship Programme.

**Connect with me:**
- LinkedIn: [[Mistura Adeoye](https://www.linkedin.com/in/mistura-adeoye/)]
- GitHub: [@AdeoyeM](https://github.com/AdeoyeM/)
