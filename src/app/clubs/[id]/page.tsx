import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Users, MapPin, Mail, Link2, Flag } from "lucide-react";
import { clubs } from "@/data/clubs";

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = clubs.find((c) => c.id === id);
  if (!club) notFound();

  const correctionSubject = encodeURIComponent(`Club correction: ${club.name}`);
  const correctionBody = encodeURIComponent(
    `Hi,\n\nI'd like to suggest a correction for the following club:\n\nClub: ${club.name}\nCorrection:\n\n[Please describe what needs to be updated]`
  );

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <Link
          href="/clubs"
          className="inline-flex items-center text-white/80 hover:text-white mb-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Clubs</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{club.name}</h1>
            <p className="text-white/80 text-sm">{club.category}</p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3 pb-8 space-y-4">
        {/* About */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">About</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {club.description}
          </p>

          <div className="mt-4 space-y-2">
            {club.meetingInfo && (
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                <span>{club.meetingInfo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        {(club.instagram || club.email) && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Contact</h2>
            <div className="space-y-3">
              {club.instagram && (
                <a
                  href={`https://instagram.com/${club.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Link2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Instagram</p>
                    <p className="text-xs text-gray-500">{club.instagram}</p>
                  </div>
                </a>
              )}
              {club.email && (
                <a
                  href={`mailto:${club.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-xs text-gray-500">{club.email}</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Official directory */}
        <a
          href="https://www.scu.edu/involved/student-organizations/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-lg bg-[#9E1B32]/10 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#9E1B32]" />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm">
              View on SCU Involved
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Official club directory and registration
            </p>
          </div>
        </a>

        {/* Suggest correction */}
        <a
          href={`mailto:anthonyjiangusa@gmail.com?subject=${correctionSubject}&body=${correctionBody}`}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 justify-center py-2"
        >
          <Flag className="w-4 h-4" />
          Suggest a correction
        </a>
      </div>
    </div>
  );
}
