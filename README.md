# MLOps Pipeline

A powerful web-based platform for training and deploying machine learning models directly in your browser using TensorFlow.js. Perfect for prototyping, experimentation, and educational purposes.

![MLOps Pipeline](https://user-images.githubusercontent.com/your-username/mlops-pipeline/main/screenshot.png)

## Features

- 🚀 Real-time model training in the browser
- 📊 Interactive visualizations with line charts and radar plots
- 📁 Custom dataset upload support
- 🔄 Support for both classification and regression tasks
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- 💾 Model export capabilities
- 🔍 Real-time training metrics visualization

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Machine Learning**: TensorFlow.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/mlops-pipeline.git
cd mlops-pipeline
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Dataset Upload

1. Prepare your dataset in CSV format
2. Last column should be the target variable
3. For classification: target should be integer class labels
4. For regression: target should be continuous values

### Model Training

1. Select your task type (Classification/Regression)
2. Upload your dataset
3. Click "Train Model" to start training
4. Monitor training progress through real-time visualizations

### Model Export

1. After training, click "Export Model"
2. The model will be saved in TensorFlow.js format
3. Use the exported model in your own applications

## Project Structure

```
mlops-pipeline/
├── src/
│   ├── components/
│   │   ├── DatasetUpload.tsx
│   │   ├── ModelExport.tsx
│   │   ├── ModelMetrics.tsx
│   │   ├── ModelTraining.tsx
│   │   └── ThemeToggle.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TensorFlow.js](https://www.tensorflow.org/js) for the machine learning capabilities
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [Recharts](https://recharts.org) for the beautiful charts
- [Heroicons](https://heroicons.com) for the icons

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/your-username/mlops-pipeline](https://github.com/your-username/mlops-pipeline)

## Roadmap

- [ ] Add support for more model architectures
- [ ] Implement model versioning
- [ ] Add data preprocessing options
- [ ] Support for more file formats
- [ ] Add model deployment options
- [ ] Implement collaborative features