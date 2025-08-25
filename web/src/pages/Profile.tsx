import { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      birthday
      phone
      address
      email
      photoURL
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      birthday
      phone
      address
    }
  }
`;

export default function Profile() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { data, loading: loadingUser, error: userError } = useQuery(
    GET_CURRENT_USER,
    {
      // skip nếu chưa có user trên client (auth.currentUser); auth-link nên lấy token tự động
      skip: !auth.currentUser,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data?.currentUser) {
      const u = data.currentUser;
      setName(u.name ?? "");
      setBirthday(u.birthday ?? "");
      setPhone(u.phone ?? "");
      setAddress(u.address ?? "");
    }
  }, [data]);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    try {
      await updateUser({
        variables: {
          input: {
            name,
            birthday,
            phone,
            address,
          },
        },
      });

      toast.success("Cập nhật thông tin thành công 🎉");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Có lỗi xảy ra: " + (err.message ?? String(err)));
    }
  };

  // hiển thị loading nếu cần
  if (loadingUser) {
    return <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">Đang tải...</div>;
  }

  if (userError) {
    console.error(userError);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cập nhật thông tin</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Họ và tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Ngày sinh</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}
