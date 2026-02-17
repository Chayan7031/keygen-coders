'use client'

import Image from 'next/image'
import React from 'react'
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'
import { thirdYearMembers, secondYearInterns, Member, convenors } from '@/app/utils/data'
import './teams.css'

interface TeamSectionProps {
  members: Member[]
  title: string
  subtitle: string
  description: string
  watermark: string
}

const TeamSection = ({ members, title, subtitle, description, watermark }: TeamSectionProps) => {
  return (
    <section className="team-section">
      <span className="team-subtitle">{subtitle}</span>
      <h2 className="team-title">{title}</h2>
      <p className="team-description">{description}</p>
      <span className="team-watermark">{watermark}</span>

      <div className="team-cards">
          {members.map((member, index) => (
          <div key={member.id} className="team-card">
            <div
              className={`team-card-accent ${
                index % 2 === 0 ? 'team-card-accent--tl' : 'team-card-accent--tr'
              }`}
            />

            <div className="team-card-image-wrapper">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                sizes="(max-width: 64rem) 50vw, 25vw"
                priority
              />
            </div>

            <div className="team-card-content">
              <h3>{member.name}</h3>
              <p className="team-card-role">{member.role || 'Member'}</p>
              <ul>
                <li>
                  <a href={member.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const Page = () => {
  return (
    <div className="min-h-screen bg-black pt-28">
      <TeamSection
        members={convenors}
        title="Convenors"
        subtitle="meet our"
        description="The driving force behind KeyGEnCoders — our convenors lead with vision, passion, and dedication."
        watermark="leads"
      />
      <TeamSection
        members={thirdYearMembers}
        title="Core Team"
        subtitle="meet the"
        description="Our third-year members form the backbone of every project, event, and initiative."
        watermark="core"
      />
      <TeamSection
        members={secondYearInterns}
        title="Interns"
        subtitle="meet the"
        description="The next generation of innovators — our second-year interns bring fresh ideas and boundless energy."
        watermark="interns"
      />
    </div>
  )
}

export default Page