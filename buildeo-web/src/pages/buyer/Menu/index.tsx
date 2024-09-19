import NavbarSearch from "../../../Components/Ui/headerSearhc";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from "react";
import Card from "../../../Components/Ui/cardMenu";
import Footer from "../../../Components/Ui/footer";
import cover from '/cover.png'
import media from '/Media.png'
import jobs from '/jobs.png'
export default function MenuPage() {
     const [value, setValue] = React.useState('one');

     const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
          setValue(newValue);
     };

     const cardData = Array(5).fill({
          title: 'Lay LVT: up to 20 m²',
          company: 'Floor Company',
          price: '119€'
     });


     return (
          <>
               <div className="">
                    <NavbarSearch bg="white" text="black" />
                    <div className="md:ml-[80px] ml-[10px] md:mr-[80px] mr-[10px]">
                         <div className="text-[32px] font-bold">Result</div>
                         <Box sx={{ width: '100%' }}>
                              <Tabs
                                   value={value}
                                   onChange={handleChange}
                                   TabIndicatorProps={{
                                        style: {
                                             backgroundColor: '#FF460A',
                                             color: '#FF460A'
                                        },
                                   }}
                                   sx={{
                                        '& .MuiTab-root': {
                                             color: '#9A9A9D',
                                        },
                                        '& .Mui-selected': {
                                             color: '#FF460A',
                                        },
                                   }}
                                   indicatorColor="secondary"
                              >
                                   <Tab value="one" label="Painter" />
                                   <Tab value="two" label="Drywall" />
                                   <Tab value="three" label="Surface treatment" />
                              </Tabs>
                              {value === 'one' &&
                                   <div>
                                        <div className="md:mt-[20px] mt-[10px] gap-[17px] flex flex-wrap md:gap-[25px]">
                                             {cardData.map((card, index) => (
                                                  <Card
                                                       key={index}
                                                       title={card.title}
                                                       company={card.company}
                                                       price={card.price}
                                                       img={cover}
                                                       link="/services/1"
                                                  />
                                             ))}
                                        </div>
                                   </div>
                              }
                              {value === 'two' &&
                                   <div>
                                        <div className="mt-[20px] flex flex-wrap gap-[20px]">
                                             {cardData.map((card, index) => (
                                                  <Card
                                                       key={index}
                                                       title={card.title}
                                                       company={card.company}
                                                       price={card.price}
                                                       img={media}
                                                       link="/services/1"
                                                  />
                                             ))}
                                        </div>
                                   </div>
                              }
                              {value === 'three' &&
                                   <div>
                                        <div className="mt-[20px] flex flex-wrap gap-[20px]">
                                             {cardData.map((card, index) => (
                                                  <Card
                                                       key={index}
                                                       title={card.title}
                                                       company={card.company}
                                                       price={card.price}
                                                       img={jobs}
                                                       link="/menu-detail"
                                                  />
                                             ))}
                                        </div>
                                   </div>
                              }

                         </Box>
                    </div>
                    <Footer />
               </div>
          </>
     )
}
