import React from "react";

const ResponseRenderer = ({ title, description, response ,}:any) => {
  const renderSections = () => {
    // return response.split("\n").map((line:any, index:any) => {
    //   if (line.startsWith("##")) {
    //     // Render main sections as headings
    //     return (
    //       <h2 key={index} style={{ marginTop: "20px", color: "#007BFF" }}>
    //         {line.replace("##", "").trim()}
    //       </h2>
    //     );
    //   } else if (line.startsWith("-")) {
    //     // Render bullet points
    //     return (
    //       <li key={index} style={{ marginLeft: "20px", lineHeight: "1.6" }}>
    //         {line.replace("-", "").trim()}
    //       </li>
    //     );
    //   } else if (line.startsWith("###")) {
    //     // Render subheadings
    //     return (
    //       <h3 key={index} style={{ marginTop: "15px", color: "#333" }}>
    //         {line.replace("###", "").trim()}
    //       </h3>
    //     );
    //   }
    //   return (
    //     <p key={index} style={{ marginBottom: "10px", lineHeight: "1.6" }}>
    //       {line.trim()}
    //     </p>
    //   );
    // });
    
    // return someDesc.split("\n").map((line:any, index:any) => {
    //   if (line.startsWith("##")) {
    //     // Render main sections as headings
    //     return (
    //       <h2 key={index} style={{ marginTop: "20px", color: "#007BFF" }}>
    //         {line.replace("##", "").trim()}
    //       </h2>
    //     );
    //   } else if (line.startsWith("-")) {
    //     // Render bullet points
    //     return (
    //       <li key={index} style={{ marginLeft: "20px", lineHeight: "1.6" }}>
    //         {line.replace("-", "").trim()}
    //       </li>
    //     );
    //   } else if (line.startsWith("###")) {
    //     // Render subheadings
    //     return (
    //       <h3 key={index} style={{ marginTop: "15px", color: "#333" }}>
    //         {line.replace("###", "").trim()}
    //       </h3>
    //     );
    //   }
    //   return (
    //     <p key={index} style={{ marginBottom: "10px", lineHeight: "1.6" }}>
    //       {line.trim()}
    //     </p>
    //   );
    // });


    return response.split("\n").map((line:any, index:any) => {
        if (line.startsWith("##")) {
          // Render main sections as headings
          return (
            <h2 key={index} style={{ marginTop: "20px", color: "#007BFF" }}>
              {line.replace("##", "").trim()}
            </h2>
          );
        } else if (line.startsWith("-")) {
          // Render bullet points
          return (
            <li key={index} style={{ marginLeft: "20px", lineHeight: "1.6" }}>
              {line.replace("-", "").replace(/\*\*/g, "").trim()}
            </li>
          );
        } else if (line.startsWith("###")) {
          // Render subheadings
          return (
            <h3 key={index} style={{ marginTop: "15px", color: "#333" }}>
              {line.replace("###", "").trim()}
            </h3>
          );
        }
        return (
          <p key={index} style={{ marginBottom: "10px", lineHeight: "1.6" }}>
            {line.replace(/\*\*/g, "").trim()}
          </p>
        );
      });


    };



  

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#F9F9F9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#444", marginBottom: "15px" }}>{title}</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>{description}</p>
      <div>{renderSections()}</div>
    </div>
  );
};

export default ResponseRenderer;
