import ResumeTemplate from "../../components/resume/resume-template"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white">
      <ResumeTemplate isPrintMode={true} />
    </div>
  )
}
