export const cyberCurriculum = {
  title: "Cyber Security & AI Defense",
  totalModules: 25,
  phases: [
    {
      phaseNumber: 1,
      title: "Foundation & Networking",
      modules: [
        { id: "c1", title: "The OSI Model Deep Dive", desc: "Understand how data packets traverse physical hardware to reach applications.", type: "standard", resources: ["Docs", "Video"] },
        { id: "c2", title: "TCP/IP & Packet Sniffing", desc: "Intercept and read unencrypted traffic using Wireshark.", type: "standard", resources: ["Lab"] },
        // ... (Add modules 3, 4 here)
        { id: "c5", title: "Network Mapping Exam", desc: "Use Nmap to discover open ports on a target server.", type: "bridge", resources: ["Exam"] }
      ]
    },
    {
      phaseNumber: 2,
      title: "Infrastructure & Virtualization",
      modules: [
        { id: "c6", title: "Hypervisor Architectures", desc: "Compare bare-metal virtualization, analyzing the architectural differences between Xen and KVM.", type: "standard", resources: ["Docs"] },
        // ... (Add modules 7, 8, 9)
        { id: "c10", title: "Cloud Instance Security", desc: "Secure a virtualized cloud environment from unauthorized access.", type: "bridge", resources: ["Exam"] }
      ]
    },
    {
      phaseNumber: 3,
      title: "Offensive Security (Red Team)",
      modules: [
         // ... (Modules 11 - 15)
         { id: "c15", title: "Vulnerability Exploitation", desc: "Safely execute a payload against a known vulnerable system.", type: "bridge", resources: ["Lab"] }
      ]
    },
    {
      phaseNumber: 4,
      title: "Automated Defense Systems",
      modules: [
        { id: "c16", title: "Python for Security", desc: "Write scripts to automate log parsing and anomaly detection.", type: "standard", resources: ["Code"] },
        // ... (Add modules 17, 18, 19)
        { id: "c20", title: "AI Intruder Detection", desc: "Build an AI-based intruder detection system in Python to monitor network traffic and flag anomalies in real-time.", type: "bridge", resources: ["Project", "GitHub"] }
      ]
    },
    {
      phaseNumber: 5,
      title: "Zero Trust Architecture",
      modules: [
        // ... (Modules 21 - 25)
        { id: "c25", title: "Enterprise Defense Blueprint", desc: "Design a fault-tolerant, zero-trust network environment assuming breaches will happen.", type: "bridge", resources: ["Final Project"] }
      ]
    }
  ]
}
