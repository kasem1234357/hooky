// const usePrint = ()=>{
//     const convertToPDF = (contentRef)=>{
//         const content = contentRef.current
//          const viewPort =  window.open("", '',);
//          viewPort.document.write('<html>');
//                  viewPort.document.write('<body > ');
//                  viewPort.document.write(`<style>
//                  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
//      *{
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//       font-family: 'Roboto', sans-serif;
//      }
//                  html{
//                    background:#eee;
//                  }
//                  .Massege__Area{
//                    padding: 10px;
//                    width:90%;
//                    margin-inline:auto;
//                    margin-top: 10px;
//                   }
//                   .Massege__Area p{
//                    color: #000;
//                    font-size:18px;
//                   }
//                   .Massege__Area img {
//                    object-position: center;
//                    width: 85%;
//                    margin-inline: auto;
//                    margin-block: 12px;
//                    display: block;
//                    object-fit: cover;
//                    border-radius: 6px;
//                   }
//                   </style>`)
//                  viewPort.document.write(`${content.outerHTML}`);
//                  viewPort.document.write('</body></html>');
//                  viewPort.document.close();
//                  viewPort.print();
//        }
//        return {
//         convertToPDF
//        }
// }
// export default usePrint