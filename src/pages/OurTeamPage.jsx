import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function OurTeam() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/teams`, { timeout: 10000 });
        setTeams(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memuat data team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  //  Pisahkan berdasarkan category dari database (management/staff)
  const { management, staff } = useMemo(() => {
    const normalize = (c) => (c || "staff").toString().trim().toLowerCase();
    const mgmt = [];
    const stf = [];

    for (const t of teams) {
      const cat = normalize(t.category);
      if (cat === "management") mgmt.push(t);
      else stf.push(t); // default ke staff jika null/unknown
    }

    return { management: mgmt, staff: stf };
  }, [teams]);

  const TeamCard = ({ person }) => (
    <div className="bg-white rounded-2xl overflow-hidden text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
      <div className="overflow-hidden">
        <img
          src={
            person.photo
              ? `${API_BASE_URL}/uploads/teams/${person.photo}`
              : "https://via.placeholder.com/300x300?text=No+Photo"
          }
          alt={person.name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-md font-medium text-gray-700 mb-1">{person.position}</h3>
        <p className="text-[#1E9C2D] font-bold text-lg">{person.name}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans scroll-smooth">
      <Navbar />

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-gray-500">Loading team...</div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-20 text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <>
          {/* MANAGEMENT */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-extrabold mb-10 text-[#1E9C2D] text-center tracking-wide">
              C-SERM MANAGEMENT
            </h2>

            {management.length === 0 ? (
              <p className="text-center text-gray-500">Belum ada data management</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {management.map((person) => (
                  <TeamCard key={person.id} person={person} />
                ))}
              </div>
            )}
          </section>

          {/* STAFF */}
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <h2 className="text-3xl font-extrabold mb-10 text-[#1E9C2D] text-center tracking-wide">
              C-SERM STAFF
            </h2>

            {staff.length === 0 ? (
              <p className="text-center text-gray-500">Belum ada data staff</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {staff.map((person) => (
                  <TeamCard key={person.id} person={person} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
