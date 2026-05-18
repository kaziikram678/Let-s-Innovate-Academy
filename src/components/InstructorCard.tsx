import Link from "next/link"
import type { Instructor } from "@/types"

interface InstructorCardProps {
  instructor: Instructor
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Link
      href={`/instructors/${instructor.slug}`}
      className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            {instructor.image ? (
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold">
                {instructor.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-indigo-400 transition-colors">
              {instructor.name}
            </h3>
            <p className="text-zinc-400 text-sm">{instructor.role}</p>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{instructor.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {instructor.specialties.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20"
            >
              {specialty}
            </span>
          ))}
        </div>

        {instructor.stats && (
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-white font-bold">{instructor.stats.studentsTaught || 0}+</p>
              <p className="text-zinc-500 text-xs">Students</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{instructor.stats.coursesCreated || 0}</p>
              <p className="text-zinc-500 text-xs">Courses</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{instructor.stats.rating || 0}</p>
              <p className="text-zinc-500 text-xs">Rating</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
