import React from "react";
import { Phone, Mail } from "lucide-react";

export default function PersonalDetails({ resume }) {
  const { name, job, address, phone, email, themeColor } = resume || {};

  return (
    <div className="mb-4">
      {/* Name & Job */}
      <h2
        className="font-bold text-2xl text-center"
        style={{ color: themeColor }}
      >
        {name || "Your Name"}
      </h2>
      {job && <p className="text-center text-sm font-medium">{job}</p>}
      {address && (
        <p className="text-center text-xs text-muted-foreground">{address}</p>
      )}

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {phone && (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Phone size={12} /> {phone}
          </div>
        )}
        {email && (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Mail size={12} /> {email}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-[1.5px] my-4" style={{ borderColor: themeColor }} />
    </div>
  );
}
