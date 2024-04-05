import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderData = [
    {
      phase: 1,
      title: "Initial Design and Development",
      question: "Q1 2023",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
    {
      phase: 2,
      title: "Testing and Refinement",
      question: "Q2 2023",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
    {
      phase: 3,
      title: "Deployment",
      question: "Q3 2023",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
    {
      phase: 4,
      title: "User Feedback and Iteration",
      question: "Q4 2023",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
    {
      phase: 5,
      title: "Finalization and Launch",
      question: "Q1 2024",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
    {
      phase: 6,
      title: "Post-launch Support and Maintenance",
      question: "Q2 2024",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reprehenderit sit in rem soluta! Omnis, debitis doloremque!",
    },
  ];

  const goNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1));
  };

  const goPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1));
  };

  return (
    <Box
      className="flex items-center justify-center flex-col relative w-[1100px] bg-main-yellow rounded-3xl m-[100px]"
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {/* Previous Button */}
      <Box className="text-4xl flex justify-center m-[20px]">Roadmap</Box>
      <Button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-main-yellow w-[100px] p-2 rounded-full shadow-md"
        onClick={goPrev}
      >
        Previous
      </Button>

      <Button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-main-yellow w-[100px] p-2 rounded-full shadow-md"
        onClick={goNext}
      >
        Next
      </Button>

      {/* Slide */}
      <Box
        className="flex flex-col gap-[20px] mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[314px] w-[250px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer"
        bg="black"
        _hover={{ opacity: "0.5" }}
      >
        <Box className="relative flex flex-col border bg-main-bgColor h-[314px] gap-[20px] p-4 rounded">
          <Box className="w-[100px] p-2 bg-main-yellow rounded m-auto mt-4">
            Phase {sliderData[currentSlide].phase}
          </Box>
          <Box className="text-xl lg:text-2xl">{sliderData[currentSlide].title}</Box>
          <Box className="lg:text-[18px]">{sliderData[currentSlide].content}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Slider;
