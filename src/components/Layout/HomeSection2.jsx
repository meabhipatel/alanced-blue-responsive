import React from "react";
import { Card, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import admistrative from "../images/admi.png";
import busines from "../images/business.png";
import desig from "../images/design.png";
import edu from "../images/education.png";
import engi from "../images/enginier.png";
import pro from "../images/programimg.png";
import sale from "../images/sales.png";
import write from "../images/writing.png";
import { Link } from "react-router-dom";
import job from "../images/job.png";
import free from "../images/free1.png";
import done from "../images/done.png";
import payment from "../images/payment.png";

const HomeSection2 = () => {
  return (
    <>
      <div className="mt-10 mb-10 text-3xl">
        <h1 className="text-center">Find Top Freelancer</h1>
        <div className="border-b border-gray-600 w-20 mx-auto mt-5"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:px-24 mt-10 px-5">
        <div>
          <Card className="bg-[#EEF8F9] rounded">
            <CardBody>
              <img src={write} alt="" />
              <Typography variant="h5" className=" text-left mt-5">
                Writing &
              </Typography>
              <Typography variant="h5" className="text-left">
                Translation
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">218,356 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#FEF8F8] rounded">
            <CardBody>
              <img src={pro} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Programming &
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                Software
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">309,384 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#EEECF7] rounded">
            <CardBody>
              <img src={desig} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Design &
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                Art
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">218,356 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#FDF6E4] rounded">
            <CardBody>
              <img src={admistrative} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Administrative &
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                Secretarial
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">100,130 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#DBD7FB] rounded">
            <CardBody>
              <img src={sale} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Sales
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                & Marketing
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">76,605 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#D3FFDE] rounded">
            <CardBody>
              <img src={engi} alt="" />
              <Typography variant="h5" color="" className="text-left mt-5">
                Engineering &
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                Architecture
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">53,508 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#FFE2C8] rounded">
            <CardBody>
              <img src={busines} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Business &
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                Finance
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">52,417 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="bg-[#D3EFFD] rounded">
            <CardBody>
              <img src={edu} alt="" />
              <Typography variant="h5" color="" className=" text-left mt-5">
                Education
              </Typography>
              <Typography variant="h5" color="" className="text-left">
                & Training
              </Typography>
              <Typography className="text-left opacity-50 text-sm mt-2">8,837 Freelancers</Typography>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/view-all/freelancer">
          <span class="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold">
            See All Skills
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-6 mt-16 mb-10 text-3xl">
        <h1>It’s Easy to Get Work Done on Alanced</h1>
        <div className="border-b border-gray-600 w-20 mx-auto mt-5"></div>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <img src={job} alt="" className="lg:ml-[30%] ml-0" />
          <Typography variant="h5" className="lg:text-center text-left mt-3">
            Post a Job
          </Typography>
          <Typography variant="h5" className="opacity-40 text-xs mt-2 lg:text-center text-left">
            Create your free job posting and
            <br />
            start receiving Quotes within
            <br />
            hours.
          </Typography>
        </div>
        <div>
          <img src={free} alt="" className="lg:ml-[30%] ml-0" />
          <Typography variant="h5" className="lg:text-center text-left mt-3">
            Hire Freelancers
          </Typography>
          <Typography variant="h5" className="opacity-40 text-xs mt-2 lg:text-center text-left">
            Compare the Quotes you receive
            <br />
            and hire the best freelance
            <br />
            professionals for the job.
          </Typography>
        </div>
        <div>
          <img src={done} alt="" className="lg:ml-[30%] ml-0" />
          <Typography variant="h5" className="lg:text-center text-left mt-3">
            Get Work Done
          </Typography>
          <Typography variant="h5" className="opacity-40 text-xs mt-2 lg:text-center text-left">
            Decide on how and when <br /> payments will be made and use <br />
            WorkRooms to collaborate,
            <br /> communicate and track work.
          </Typography>
        </div>
        <div>
          <img src={payment} alt="" className="lg:ml-[30%]   ml-0" />
          <Typography variant="h5" className="lg:text-center text-left mt-3">
            Make Secure Payments
          </Typography>
          <Typography variant="h5" className="opacity-40 mt-2 lg:text-center text-left text-xs">
            Choose from multiple payment <br /> methods with SafePay payment <br /> protection.
          </Typography>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 text-center">
        <Link to="/enterprises" onClick={() => window.scroll(0, 0)}>
          <span className="inline-block text-sm px-4 py-2 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded text-white font-semibold">
            See How Alanced Work
          </span>
        </Link>
      </div>
    </>
  );
};

export default HomeSection2;
