import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { MdBubbleChart } from "react-icons/md";

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      ref.current.style.opacity = 1;
      ref.current.style.transform = "translateY(0)";
    }
  }, [isInView]);

  return (
    <section className="body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
            About Us
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            We are a team of developers who are passionate about helping others.
            We created this platform to help reduce food wastage and help those
            in need.
          </p>
        </div>
        <div
          className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2"
          ref={ref}
        >
          <motion.div
            className="p-2 sm:w-1/2 w-full"
            initial={!isInView && { opacity: 0, y: 100 }}
            animate={!isInView && { opacity: 1, y: 0 }}
            transition={
              !isInView && { duration: 1, ease: "easeOut", delay: 0.2 }
            }
          >
            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
              <MdBubbleChart className="text-blue-500 w-12 h-12 flex-shrink-0 mr-4" />
              <span className="title-font font-medium">
                Reduce Food Wastage
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            whileInView="visible"
            className="p-2 sm:w-1/2 w-full"
          >
            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
              <FaRegHeart className="text-blue-500 w-12 h-12 flex-shrink-0 mr-4" />
              <span className="title-font font-medium">Help Those in Need</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
