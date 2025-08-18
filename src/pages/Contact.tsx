import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const SEND_CONTACT = gql`
  mutation SendContact($data: ContactInput!) {
    sendContact(data: $data) {
      success
      message
    }
  }
`;

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendContact, { loading, data, error }] = useMutation(SEND_CONTACT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendContact({ variables: { data: formData } });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Liên hệ với chúng tôi</h1>

        {data && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              data.sendContact.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {data.sendContact.message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded text-center bg-red-100 text-red-700">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            name="message"
            placeholder="Tin nhắn"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-32"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Đang gửi..." : "Gửi liên hệ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
