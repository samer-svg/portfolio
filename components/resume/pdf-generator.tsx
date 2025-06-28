"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export function ResumeActions() {
  const handleDownloadPDF = () => {
    // Open the resume page in a new window for printing/PDF
    const resumeWindow = window.open("/resume", "_blank")
    if (resumeWindow) {
      resumeWindow.onload = () => {
        setTimeout(() => {
          resumeWindow.print()
        }, 500)
      }
    }
  }

  const handleViewResume = () => {
    window.open("/resume", "_blank")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
        onClick={handleDownloadPDF}
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
        onClick={handleViewResume}
      >
        <FileText className="w-4 h-4 mr-2" />
        View Resume
      </Button>
    </div>
  )
}
