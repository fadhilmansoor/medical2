// import Link from "next/link";
// import Header from "@/layout/Header";
// import Footer from "@/layout/Footer";
// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// import { serviceboxdata } from "@/constant/alldata";

// export default function ServiceDetailIndexPage() {
//   return (
//     <>
//       <Header />
//       <main className="page-content">
//         <PageBanner title="Services" bnrimage={IMAGES.bnr2.src} />

//         <section className="content-inner">
//           <div className="container">
//             <div className="row">
//               {serviceboxdata.map((item) => (
//                 <div key={item.id} className="col-md-4 m-b30">
//                   <Link href={`/service-detail/${item.slug}`} className="dz-card style-1 d-block">
//                     <div className="dz-info">
//                       <h4 className="dz-title">{item.title}</h4>
//                       <p className="m-b0">{item.description}</p>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }
