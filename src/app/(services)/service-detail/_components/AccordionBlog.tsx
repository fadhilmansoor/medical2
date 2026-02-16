// "use client"
// import { Accordion } from "react-bootstrap"
// import { accordiondata } from "@/constant/alldata";

// const AccordionBlog = () =>{
//     return(
//         <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
//             {accordiondata.map((data, i) => (
//                 <Accordion.Item eventKey={data.key} key={i} className="wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.7s">
//                     <Accordion.Header>{data.title}</Accordion.Header>
//                     <Accordion.Body>
//                         It is a long established fact that a reader will be distracted by the readable content of a page when looking at its. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
//                     </Accordion.Body>
//                 </Accordion.Item>
//             ))}
//         </Accordion>
//     )
// }
// export default AccordionBlog;

"use client";

import { useId, useState } from "react";

export type FaqItem = {
  key: string;
  delay?: string;
  title: string;
  body: string;
};

type Props = {
  faqs?: FaqItem[];
  defaultActiveKey?: string;
};

const AccordionBlog = ({ faqs = [], defaultActiveKey }: Props) => {
  const uid = useId().replace(/:/g, "");
  const parentId = `accordion-${uid}`;

  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey ?? faqs[0]?.key ?? "0"
  );

  if (!faqs.length) return null;

  return (
    <div className="accordion dz-accordion style-1" id={parentId}>
      {faqs.map((item, i) => {
        const isOpen = activeKey === item.key;
        const headingId = `heading-${uid}-${item.key}`;
        const collapseId = `collapse-${uid}-${item.key}`;

        return (
          <div
            key={item.key ?? String(i)}
            className={`accordion-item wow fadeInUp`}
            data-wow-delay={item.delay || `${0.2 + i * 0.1}s`}
            data-wow-duration="0.7s"
          >
            <h2 className="accordion-header" id={headingId}>
              <button
                type="button"
                className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                aria-expanded={isOpen}
                aria-controls={collapseId}
                onClick={() => setActiveKey(isOpen ? "" : item.key)}
              >
                {item.title}
              </button>
            </h2>

            <div
              id={collapseId}
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
              aria-labelledby={headingId}
            >
              <div className="accordion-body">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionBlog;
