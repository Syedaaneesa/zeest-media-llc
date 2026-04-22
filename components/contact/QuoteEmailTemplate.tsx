export default function ContactEmail({
  name,
  email,
  phone,
  company,
  regions,
  budget,
  details,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
  regions: string[];
  budget: string;
  details: string; 
}) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", padding: "20px" }}>
      
      {/* Card */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        
        {/* Header */}
        <div
          style={{
            background: "#111A3A",
            color: "#ffffff",
            padding: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>New Quote Request</h2>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", color: "#333" }}>
          
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Company:</strong> {company}</p>

          <p>
            <strong>Regions:</strong>{" "}
            {regions?.length ? regions.join(", ") : "N/A"}
          </p>

          <p>
            <strong>Budget:</strong>{" "}
            <span style={{ color: "#D13C6F", fontWeight: "bold" }}>
              ${budget}
            </span>
          </p>

          {/* Optional Field */}
          {details && (
            <div style={{ marginTop: "15px" }}>
              <p><strong>Project Details:</strong></p>
              <p
                style={{
                  background: "#f9fafb",
                  padding: "10px",
                  borderLeft: "4px solid #D13C6F",
                  borderRadius: "5px",
                }}
              >
                {details}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#f1f1f1",
            padding: "15px",
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Your Company — All rights reserved
        </div>
      </div>
    </div>
  );
}