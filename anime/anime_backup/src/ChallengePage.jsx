import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import Confetti from 'react-confetti';

const ChallengePage = () => {
  const { type, level } = useParams(); // type: offensive/defensive, level: beginner/expert/advanced
  const navigate = useNavigate();
  const { challengeLevels, updateChallengeLevel, unlockNext } = useGame();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [confettiActive, setConfettiActive] = useState(false);
  const [gameSequence, setGameSequence] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(-1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCompletionMessages, setShowCompletionMessages] = useState(false);
  const [completionMessages, setCompletionMessages] = useState([]);
  const [blurScreen, setBlurScreen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [finalMessage, setFinalMessage] = useState(false);

  const fullTitle = `${type.toUpperCase()} ${level.toUpperCase()} Challenges`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedTitle(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullTitle]);

  const shuffle = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateCompletionMessages = () => {
    const messages = [];
    const numMessages = 50; // Decreased number of messages
    for (let i = 0; i < numMessages; i++) {
      messages.push({
        id: i,
        text: "Congratulations!",
        x: Math.random() * 90 + '%', // Random position across full screen
        y: Math.random() * 90 + '%',
        delay: Math.random() * 3000,
        visible: false
      });
    }
    setCompletionMessages(messages);
  };

  useEffect(() => {
    if (showCompletionMessages) {
      // Phase 1: Screen turns black
      setAnimationPhase('black');
      setBlurScreen(true);
      setTimeout(() => {
        // Phase 2: Show final message
        setAnimationPhase('final');
        setFinalMessage(true);
        setTimeout(() => {
          setFinalMessage(false);
          setShowCompletionMessages(false);
          setAnimationPhase('idle');
          navigate('/game-selection');
        }, 2000); // Show message for 2 seconds
      }, 1000); // Black screen for 1 second
    }
  }, [showCompletionMessages, navigate, type]);

  // Sample content and quiz data for each level
  const levelData = {
    offensive: {
      beginner: [
        {
          content: "Arr, matey! An IP address be a unique identifier fer each device sailin' the vast seas o' the network. It serves two main functions: host or network interface identification and location addressin'. IPv4 addresses be 32-bit numbers usually expressed in decimal format, like 192.168.1.1. IPv6 addresses be 128-bit and provide a much larger address space, perfect fer expandin' yer pirate fleet.\n\nYe see, in the world o' offensive security, understandin' IP addresses be fundamental fer network reconnaissance and targetin' specific devices in yer attacks. Without knowin' yer target's IP, ye might as well be sailin' blind in a fog! Attackers use IP addresses to map out networks, identify vulnerable systems, and launch precise strikes against their prey. \n\n  So hoist the Jolly Roger and learn these addresses well, fer they be the map to yer digital booty. Remember, every ship on the seven seas o' the internet has its own unique mark, and ye need to know how to read 'em to plunder successfully. IPv4 uses dotted decimal notation, while IPv6 employs hexadecimal with colons, offerin' room fer trillions more devices. Master this knowledge, and ye'll navigate the cyber oceans like a true captain, spotin' weaknesses and claimin' victories in the name o' offensive security. \n\n  In practice, IP addresses help in port scannin', where ye probe fer open doors on a target. They enable geolocation trackin', allowin' ye to pinpoint yer enemy's location. Moreover, spoofin' IP addresses can mask yer identity durin' attacks, makin' ye a ghost in the machine. Without this foundation, yer offensive operations be doomed to fail, like a ship without a rudder driftin' aimlessly.  \n\n   Fer advanced plunderin', understand subnettin' and CIDR notation, which divide networks into smaller territories. This knowledge lets ye carve out attack vectors and exploit misconfigurations. So study hard, ye scurvy dogs, fer IP addresses be the cornerstone o' yer cyber pirate empire!",
          quizType: 'multiple',
          quiz: {
            question: "What is an IP address?",
            options: ["A type of computer", "A unique identifier for devices on a network", "A password"],
            correct: 1
          }
        },
        {
          content: "Ahoy, ye scurvy dogs! TCP/IP be the fundamental protocol suite fer the internet, the very backbone o' our digital voyages. TCP (Transmission Control Protocol) provides reliable, ordered delivery o' data between applications, makin' sure yer messages arrive intact and in the right order.\n\nIP (Internet Protocol) handles addressin' and routin', guidin' yer packets through the treacherous waters o' the network. TCP establishes connections, ensures data integrity, and handles retransmission o' lost packets, while IP focuses on packet routin' and delivery.\n\nIn offensive security, understandin' TCP/IP be crucial fer craftin' network attacks, analyzin' traffic, and exploitin' protocol weaknesses. Without this knowledge, ye'll be like a landlubber tryin' to sail a ship – doomed to sink! So study these protocols well, fer they be the wind in yer sails o' cyber plunder.\n\nTCP uses a three-way handshake to establish connections, ensurin' both parties be ready fer communication. IP, on the other hand, be connectionless and focuses on best-effort delivery, makin' it vulnerable to spoofin' and manipulation. Attackers can exploit TCP sequence numbers or IP fragmentation to bypass security measures.\n\nMasterin' TCP/IP allows ye to craft custom packets, perform man-in-the-middle attacks, and understand how firewalls and intrusion detection systems work. Without this foundation, yer offensive toolkit be as useless as a wooden sword in battle. So sharpen yer skills, pirates, and learn to command the protocols that rule the digital seas!",
          quizType: 'multiple',
          quiz: {
            question: "What does TCP stand for?",
            options: ["Transmission Control Protocol", "Total Computer Power", "Tech Control Panel"],
            correct: 0
          }
        },
        {
          content: "Listen up, ye bilge rats! Subnetting be the process o' dividin' a network into smaller sub-networks, makin' it easier to manage and more secure. It improves network performance, enhances security, and makes network management a breeze fer savvy pirates like yerselves.\n\nA subnet mask determines which part o' an IP address be the network portion and which be the host portion. Fer example, 255.255.255.0 be a common subnet mask fer class C networks, dividin' the address space nicely.\n\nIn offensive security, subnetting knowledge helps attackers map network topology and identify target ranges. Ye can use this to navigate the network like a true captain, findin' the best routes to yer treasure. Without subnetting, ye'd be lost in a maze o' addresses, unable to pinpoint yer prey. So learn this art well, fer it be the compass that guides yer attacks!\n\nSubnetting uses CIDR notation, like /24 or /16, to specify the number o' bits in the network portion. This allows fer variable-length subnet masks, givin' ye flexibility in dividin' yer digital territories. Attackers use subnetting to perform network scannin' more efficiently, identifyin' broadcast domains and potential vulnerabilities.\n\nUnderstandin' subnetting also helps in bypassin' network segmentation, a common security measure. By calculatin' subnet ranges, ye can find hidden networks or exploit misconfigured routers. Without this knowledge, ye'll be sailin' in circles, unable to breach the fortified castles o' yer targets. So study the art o' subnetting, mateys, fer it be the key to unlockin' the secrets o' network architecture!",
          quizType: 'multiple',
          quiz: {
            question: "What is a subnet mask used for?",
            options: ["Hiding data", "Dividing a network into subnetworks", "Encrypting messages"],
            correct: 1
          }
        },
        {
          content: "Heave ho, me hearties! Port scannin' be a technique used to identify open ports and services runnin' on a target system, like checkin' the hatches on a ship before boardin'. Attackers use tools like Nmap to send packets to different ports and analyze the responses, findin' weak points in the hull.\n\nOpen ports indicate potential entry points fer attacks, like unlocked doors on a treasure chest. Common ports include 80 (HTTP), 443 (HTTPS), 22 (SSH), and 3389 (RDP), each leadin' to different services ye can exploit.\n\nPort scannin' be often the first step in reconnaissance durin' offensive security assessments. It's like scoutin' the island before landin' yer troops. Without knowin' which ports be open, ye might waste yer time attackin' closed doors. So master this skill, pirates, and ye'll always know where to strike first!\n\nThere be different types o' port scans: SYN scans fer stealth, connect scans fer reliability, and UDP scans fer discoverin' UDP services. Each has its advantages and can help ye gather intelligence without alertin' the target. Tools like Nmap offer advanced features like OS fingerprintin' and service version detection.\n\nIn offensive operations, port scannin' helps identify vulnerable services, find misconfigured systems, and plan yer attack vectors. Ye can use the information to launch targeted exploits or social engineerin' attacks. Without proper port scannin' techniques, ye'll be shootin' in the dark, wastin' yer ammunition on fortified positions. So learn to scan like a true pirate captain, mappin' out every port and service on yer enemy's ship!",
          quizType: 'multiple',
          quiz: {
            question: "What is port scanning?",
            options: ["Scanning for open ports on a network", "Checking computer temperature", "Monitoring internet speed"],
            correct: 0
          }
        },
        {
          content: "Avast, ye sea dogs! A firewall be a network security device that monitors and controls incomin' and outgoin' network traffic based on predetermined security rules. It acts as a barrier between trusted internal networks and untrusted external networks like the internet, keepin' the scurvy outsiders at bay.\n\nFirewalls can be hardware, software, or cloud-based, examinin' packets and allowin' or blockin' traffic based on rules. They're like the cannons on yer ship, protectin' against invaders.\n\nIn offensive security, understandin' firewall configurations helps attackers find bypass techniques or misconfigurations. Ye need to know how to sneak past these defenses, findin' holes in the wall or trickin' the guards. Without this knowledge, ye'll be blasted out o' the water before ye even get close. So study firewalls well, mateys, fer they be the first line o' defense ye must conquer!\n\nFirewalls use stateful inspection to track connection states, application-layer filterin' to examine protocols, and next-generation features like intrusion prevention. Attackers can use fragmentation, tunneling, or protocol anomalies to bypass these defenses. Tools like firewall scanners help identify weak rules or misconfigurations.\n\nIn yer offensive campaigns, ye'll encounter different firewall types: packet-filterin' firewalls, circuit-level gateways, and application-level proxies. Each has strengths and weaknesses ye can exploit. Without masterin' firewall evasion techniques, ye'll be stuck at the harbor, unable to launch yer attacks. So learn the ways o' the firewall, pirates, and ye'll sail through defenses like a ghost ship in the night!",
          quizType: 'multiple',
          quiz: {
            question: "What is a firewall?",
            options: ["A physical barrier", "A network security system", "A type of virus"],
            correct: 1
          }
        },
        {
          content: "Shiver me timbers! ARP (Address Resolution Protocol) be a protocol used to map IP addresses to MAC addresses on a local network. When a device wants to communicate with another on the same network, it uses ARP to discover the recipient's MAC address, like askin' fer directions in a crowded port.\n\nARP poisonin' be a common attack where an attacker sends fake ARP messages to associate their MAC address with a legitimate IP address, enablin' man-in-the-middle attacks. It's like impersonatin' a trusted captain to steal secrets.\n\nUnderstandin' ARP be essential fer network-level attacks. Ye can use it to intercept communications, redirect traffic, or hide yer presence. Without ARP knowledge, ye'll be sailin' in the dark, unable to manipulate the local network. So learn this protocol, pirates, fer it be a powerful tool in yer arsenal o' cyber tricks!\n\nARP operates at the data link layer, sendin' broadcast requests to resolve IP addresses to MAC addresses. Attackers can poison the ARP cache, causin' traffic to be redirected through their machine. This enables eavesdroppin', data modification, or denial-of-service attacks.\n\nIn offensive security, ARP spoofin' be particularly effective on local networks where switches don't have port security enabled. Ye can use tools like Ettercap or Cain & Abel to automate the process. Without understandin' ARP, ye'll miss out on one o' the most effective local network attack vectors. So study this protocol well, mateys, fer it be the key to unlockin' the secrets flowin' through the ether!",
          quizType: 'multiple',
          quiz: {
            question: "What is ARP?",
            options: ["Address Resolution Protocol", "Advanced Routing Protocol", "Automatic Repair Program"],
            correct: 0
          }
        },
        {
          content: "Yo ho ho! A MAC address be a unique identifier assigned to network interfaces fer communications on a physical network segment. It's a 48-bit address usually expressed in hexadecimal format, like 00:1B:44:11:3A:B7, servin' as the permanent mark on yer ship's hull.\n\nMAC addresses be used at the data link layer o' the OSI model, different from IP addresses which can change. Unlike IPs, MACs be permanent and tied to the hardware, makin' 'em harder to spoof but still possible with the right tools.\n\nIn offensive security, MAC addresses can be spoofed to bypass network access controls or perform impersonation attacks. Ye can change yer MAC to look like a trusted device and sneak past defenses. Without understandin' MACs, ye'll be stuck at the dock, unable to enter restricted waters. So memorize these addresses, mateys, fer they be the key to unlockin' many a secure network!\n\nMAC addresses consist o' an OUI (Organizationally Unique Identifier) and a device-specific portion. The first three bytes identify the manufacturer, while the last three be unique to the device. Attackers can spoof MAC addresses usin' tools like macchanger or built-in OS commands.\n\nIn wireless networks, MAC filterin' be a common security measure, but spoofin' allows ye to bypass it. MAC spoofin' can also help in trackin' devices or performin' deauthentication attacks. Without this knowledge, ye'll be unable to impersonate trusted devices or evade detection on local networks. So learn the art o' MAC manipulation, pirates, fer it be essential fer yer stealthy operations!",
          quizType: 'multiple',
          quiz: {
            question: "What is a MAC address?",
            options: ["Media Access Control address", "Main Access Code", "Machine Address Code"],
            correct: 0
          }
        },
        {
          content: "Dead men tell no tales, but DNS does! DNS (Domain Name System) be a hierarchical decentralized namin' system fer computers, services, or other resources connected to the internet. It translates human-readable domain names into IP addresses, like turnin' 'TreasureIsland.com' into a numerical address.\n\nDNS servers maintain databases o' domain names and their correspondin' IP addresses, actin' as the phone book o' the internet. DNS poisonin' attacks involve corruptin' these records to redirect users to malicious sites, sendin' 'em to Davy Jones' locker instead o' their intended destination.\n\nUnderstandin' DNS be crucial fer attacks involvin' domain hijackin' or cache poisonin'. Ye can manipulate DNS to reroute traffic, create fake domains, or intercept communications. Without DNS knowledge, ye'll be lost in the vast ocean o' the web, unable to find yer targets. So master this system, pirates, fer it be the map that leads to hidden treasures!\n\nDNS uses a distributed hierarchy o' authoritative servers, from root servers down to local resolvers. Attackers can exploit DNS vulnerabilities through cache poisonin', where fake records be inserted into resolvers. Tools like dnsspoof or Ettercap help in performin' these attacks.\n\nIn offensive operations, DNS reconnaissance helps identify subdomains, mail servers, and other infrastructure. Ye can use DNS tunneling to exfiltrate data or create command-and-control channels. Without understandin' DNS, ye'll be unable to perform effective reconnaissance or maintain persistence. So study the domain namin' system, mateys, fer it be the backbone o' internet navigation!",
          quizType: 'multiple',
          quiz: {
            question: "What is DNS?",
            options: ["Domain Name System", "Data Network Service", "Digital Network Security"],
            correct: 0
          }
        },
        {
          content: "Sail ho! A VPN (Virtual Private Network) creates a secure, encrypted connection over a less secure network, such as the internet. It extends a private network across a public network, enablin' users to send and receive data as if their devices were directly connected to the private network, like havin' a secret tunnel under the castle walls.\n\nVPNs use tunnelin' protocols and encryption to protect data, keepin' yer communications safe from eavesdroppers. They're like a cloak o' invisibility fer yer online activities.\n\nIn offensive security, VPNs can be used by attackers to hide their location and bypass geographic restrictions, or they can be targeted fer exploitation. Ye might use a VPN to mask yer IP while attackin', or find vulnerabilities in VPN software to break through. Without understandin' VPNs, ye'll be exposed on the open seas, vulnerable to detection. So learn about these networks, mateys, fer they be both shield and sword in the cyber world!\n\nVPNs use protocols like OpenVPN, IPSec, or WireGuard to create encrypted tunnels. Attackers can perform VPN pivotin' to access internal networks or exploit weak authentication. Tools like OpenVPN or commercial VPN services be commonly used in offensive operations.\n\nIn red teamin', VPNs help maintain operational security by hidin' command-and-control traffic. However, they can also be targeted through man-in-the-middle attacks or protocol weaknesses. Without VPN knowledge, ye'll be unable to maintain anonymity or securely access compromised networks. So master the art o' virtual private networkin', pirates, fer it be crucial fer yer covert operations!",
          quizType: 'multiple',
          quiz: {
            question: "What is a VPN?",
            options: ["Virtual Private Network", "Very Private Node", "Visual Programming Network"],
            correct: 0
          }
        },
        {
          content: "Walk the plank if ye don't listen! Packet sniffin' involves capturin' and analyzin' network packets as they travel across a network, like eavesdroppin' on sailors' conversations. Tools like Wireshark allow attackers to intercept and inspect data packets, revealin' sensitive information like passwords, session tokens, or unencrypted communications.\n\nThis technique be particularly effective on unencrypted networks or when combined with ARP poisonin', lettin' ye listen in on private talks. Packet sniffin' helps identify vulnerabilities and extract valuable data from network traffic, like findin' gold coins in the sand.\n\nIn offensive security, packet analysis be a powerful tool fer reconnaissance and exploitation. Ye can capture login credentials, session cookies, or other secrets floatin' through the ether. Without packet sniffin' skills, ye'll be deaf to the whispers o' the network, missin' crucial intelligence. So sharpen yer ears, pirates, and learn to sniff out the digital winds – they carry the secrets o' yer enemies!\n\nPacket sniffin' requires puttin' yer network interface into promiscuous mode to capture all traffic. Tools like tcpdump, Wireshark, or Scapy provide advanced filterin' and analysis capabilities. Attackers can use this to perform protocol analysis, identify encryption weaknesses, or extract sensitive data.\n\nIn man-in-the-middle scenarios, packet sniffin' be combined with ARP poisonin' or DNS spoofin' to intercept communications. Ye can capture unencrypted protocols like HTTP, FTP, or Telnet to steal credentials. Without masterin' packet sniffin', ye'll be blind to the data flowin' around ye, missin' opportunities fer exploitation. So learn to read the packets, mateys, fer they contain the treasures o' the network!",
          quizType: 'multiple',
          quiz: {
            question: "What is packet sniffing?",
            options: ["Smelling packets", "Capturing and analyzing network packets", "Sending packets"],
            correct: 1
          }
        }
      ],

      expert: [
        {
          content: "Ahoy, ye scurvy dogs! Nmap be the map o' the digital seas, a powerful network mappin' tool that lets ye chart out ports, services, and devices on yer target's network. Like a trusty spyglass, it scans fer open doors and hidden treasures, revealin' what be runnin' on each ship in the fleet. Nmap uses various scannin' techniques, includin' SYN scans fer stealth and UDP scans fer discoverin' services that don't use TCP. It can also perform OS detection, version scannin', and script-based checks usin' the NSE (Nmap Scriptin' Engine).<br /><br />With Nmap, ye can perform stealthy scans to avoid detection, or aggressive ones to gather all the intelligence ye need. It be essential fer reconnaissance, helpin' ye identify vulnerable systems before launchin' yer attacks. Ye can also use Nmap scripts fer advanced tasks like vulnerability detection or OS fingerprintin'. Without Nmap, ye'd be sailin' blind into enemy waters, missin' out on crucial details like service versions and hostnames! Nmap supports IPv6, firewall evasion techniques, and can be integrated with other tools fer automated scannin'.<br /><br />Master this tool, pirates, fer it be the foundation o' yer offensive toolkit. Use it wisely, and ye'll uncover the weaknesses in any fortress, leadin' to glorious victories in the name o' cyber plunder. Nmap's versatility makes it indispensable fer both beginners and seasoned hackers, allowin' ye to adapt yer approach based on the target's defenses. Remember, always scan with permission, as unauthorized network mappin' be illegal. Nmap has been around since 1997 and remains the gold standard fer network discovery.",
          quizType: 'multiple',
          quiz: {
            question: "What is Nmap primarily used for?",
            options: ["Password cracking", "Network mapping and port scanning", "Web browsing"],
            correct: 1
          }
        },
        {
          content: "Shiver me timbers! Metasploit be the ultimate weapon in yer arsenal, a framework fer developin' and executin' exploits against remote systems. Like a cannon loaded with chain shot, it tears through defenses, allowin' ye to gain control o' enemy ships with ease. Metasploit includes a vast library o' exploits, payloads, and auxiliary modules that cover a wide range o' vulnerabilities. It be developed by Rapid7 and comes in both commercial (Metasploit Pro) and open-source (Metasploit Framework) versions.<br /><br />This tool comes packed with modules fer every type o' attack, from buffer overflows to SQL injections. Ye can customize yer payloads to evade detection and deliver the perfect strike. Metasploit be the choice o' seasoned pirates fer its versatility and power. It also supports meterpreter sessions fer post-exploitation, lettin' ye maintain control and gather more intelligence. The framework includes tools like msfconsole, msfvenom fer payload generation, and Armitage fer GUI-based operations.<br /><br />Learn to wield Metasploit, mateys, and ye'll become unstoppable. It turns complex exploits into simple commands, makin' ye a terror on the high seas o' cybersecurity. Hoist the Jolly Roger and conquer with Metasploit! Remember, ethical use be key, as this tool can be a double-edged sword in the wrong hands. Metasploit has been used in countless penetration testin' engagements and be a staple in red team operations worldwide.",
          quizType: 'multiple',
          quiz: {
            question: "What is Metasploit?",
            options: ["A web browser", "An exploitation framework", "A firewall"],
            correct: 1
          }
        },
        {
          content: "Walk the plank if ye ignore Wireshark! This packet sniffin' tool be like eavesdroppin' on the whispers o' the network, capturin' and analyzin' every message floatin' through the ether. Ye can see passwords, data, and secrets plain as day, revealin' the enemy's plans. Wireshark supports hundreds o' protocols and can decode encrypted traffic if ye have the keys. It be formerly known as Ethereal and be one o' the most popular network protocol analyzers.<br /><br />Wireshark dissects protocols, filters traffic, and helps ye understand how systems communicate. It's invaluable fer debuggin' attacks or spyin' on unencrypted connections. Without it, ye'd miss the golden nuggets o' intelligence hidin' in the data stream. Ye can use display filters to focus on specific traffic, like HTTP requests or DNS queries. It also supports capture filters to limit what ye capture, savin' disk space and processin' time.<br /><br />Master Wireshark, ye cunning devils, and ye'll read the network like an open book. It be the spyglass fer the digital age, lettin' ye intercept and analyze traffic to uncover vulnerabilities and launch precise strikes. Combined with tools like tcpdump, it gives ye unparalleled visibility into network communications. Wireshark can export packets in various formats and integrate with other security tools fer comprehensive analysis. Use it ethically, as capturin' traffic without permission be a violation o' privacy laws.",
          quizType: 'multiple',
          quiz: {
            question: "What does Wireshark do?",
            options: ["Scans for viruses", "Captures and analyzes network packets", "Encrypts data"],
            correct: 1
          }
        },
        {
          content: "Burp Suite be the infiltrator's best mate, a comprehensive platform fer testin' web application security. Like a ghost ship slippin' through defenses, it intercepts, inspects, and modifies HTTP requests and responses, findin' holes in web fortresses. Burp includes a proxy, scanner, intruder, and repeater tools fer thorough web app assessment. It be developed by PortSwigger and comes in Community (free), Professional, and Enterprise editions.<br /><br />With tools fer spiderin' sites, scannin' fer vulnerabilities, and manipulat in' traffic, Burp Suite be perfect fer penetratin' web apps. Ye can automate attacks or manually probe fer weaknesses like XSS or SQL injection. It's the Swiss army knife o' web hackers. The intruder tool allows fer customized attack payloads, while the repeater lets ye tweak and resend requests. Burp also includes a decoder, comparer, and sequencer fer advanced testin'.<br /><br />Equip yerself with Burp Suite, pirates, and ye'll breach any web stronghold. It be essential fer offensive web security, turnin' ye into a master o' digital infiltration and plunder. Professional editions offer advanced features like automated scanning and collaboration tools. Burp has been used in major security assessments and be trusted by penetration testers worldwide. Remember to use it only on systems ye have permission to test.",
          quizType: 'multiple',
          quiz: {
            question: "What is Burp Suite used for?",
            options: ["Password storage", "Web application security testing", "File compression"],
            correct: 1
          }
        },
        {
          content: "John the Ripper be the locksmith o' the cyber world, a fast password crackin' tool that breaks hashes and reveals secrets. Like pickin' a treasure chest lock, it uses brute force and dictionary attacks to guess passwords hidden in encrypted form. John supports multiple hash types, includin' MD5, SHA, and bcrypt, makin' it versatile fer various scenarios. It be open-source and available on multiple platforms, includin' Windows via the 'John the Ripper' project.<br /><br />This tool supports multiple hash types and can crack even complex passwords given enough time. It's crucial fer gainin' access to accounts or decryptin' stolen data. Without John, ye'd be stuck starin' at locked doors! Ye can use custom wordlists or rules to optimize yer attacks, and it can run on multiple cores fer faster crackin'. John also supports GPU acceleration fer even faster processin'.<br /><br />Learn John the Ripper, ye bold buccaneers, and ye'll unlock the gates to forbidden realms. It be a staple in any offensive toolkit, helpin' ye recover passwords and escalate privileges in yer conquests. Remember, use it responsibly, as crackin' passwords without permission be illegal in most jurisdictions. John has been around since 1996 and remains one o' the most powerful password crackers available.",
          quizType: 'multiple',
          quiz: {
            question: "What is John the Ripper?",
            options: ["A web scraper", "A password cracking tool", "A network scanner"],
            correct: 1
          }
        },
        {
          content: "Hydra be the batterin' ram o' login attacks, a parallelized brute force tool that tries thousands o' passwords against services like SSH, FTP, or HTTP. Like rammin' a castle gate, it relentlessly hammers away until it finds the weak spot. Hydra supports over 50 protocols and can use custom wordlists or generate passwords on the fly. It be part o' the THC (The Hacker's Choice) toolkit and be available on most Linux distributions.<br /><br />Ye can customize wordlists and use it fer online password crackin', makin' it deadly effective against weak authentication. Hydra be fast and flexible, supportin' many protocols. It's the go-to fer gainin' unauthorized access. Features like proxy support and SSL encryption make it even more powerful fer stealthy operations. Hydra can also perform offline attacks if ye have password hashes.<br /><br />Wield Hydra wisely, mateys, fer it can bring down defenses with sheer force. Master this tool, and ye'll breach any login screen, claimin' victory in the name o' offensive security. But beware, excessive attempts can trigger account lockouts or alert administrators. Hydra be particularly useful fer testin' the strength o' yer own systems' authentication mechanisms.",
          quizType: 'multiple',
          quiz: {
            question: "What is Hydra used for?",
            options: ["Encrypting files", "Brute force password cracking", "Scanning networks"],
            correct: 1
          }
        },
        {
          content: "Aircrack-ng be the wireless pirate's delight, a suite o' tools fer assessin' Wi-Fi network security. Like boardin' a ship from the air, it monitors, attacks, and cracks WEP/WPA keys, lettin' ye hijack wireless connections. The suite includes tools like airodump-ng fer packet capturin' and aireplay-ng fer injection attacks. It be a complete rewrite o' the original aircrack and supports modern wireless standards.<br /><br />With tools fer packet injection, deauthentication, and handshake capturin', Aircrack-ng reveals the secrets o' wireless networks. Ye can test yer own security or exploit others'. It's essential in the age o' ubiquitous Wi-Fi. It supports various encryption types and can crack WPA2 networks given enough time and a good wordlist. The suite also includes tools fer monitorin' mode, fake access points, and WPS attacks.<br /><br />Command Aircrack-ng, ye sky sailors, and ye'll rule the airwaves. It be the key to wireless domination, helpin' ye intercept traffic and launch man-in-the-middle attacks from afar. Use it ethically to improve wireless security, not to plunder innocent networks. Aircrack-ng has been instrumental in demonstratin' the weaknesses o' wireless encryption standards over the years.",
          quizType: 'multiple',
          quiz: {
            question: "What is Aircrack-ng?",
            options: ["A wired network tool", "A wireless security assessment suite", "A firewall"],
            correct: 1
          }
        },
        {
          content: "SQLMap be the database plunderer, an automated tool fer detectin' and exploitin' SQL injection vulnerabilities. Like diggin' fer buried treasure, it injects malicious SQL code to extract data from databases, dumpin' sensitive information. SQLMap supports various database management systems like MySQL, PostgreSQL, and Oracle. It be written in Python and be one o' the most advanced SQL injection tools available.<br /><br />This tool supports various database engines and can perform advanced attacks like blind injection or privilege escalation. It's a must-have fer web app penetration testin'. Without SQLMap, ye'd leave database gold untouched! It can automate the entire exploitation process, from detection to data extraction. SQLMap can also perform database takeover, read/write files, and execute system commands.<br /><br />Master SQLMap, ye data divers, and ye'll drain the coffers o' any database. It automates the complex art o' SQL injection, makin' ye a master o' data theft and manipulation. Always obtain permission before usin' it, as unauthorized database access be a serious crime. SQLMap has been used in numerous security research projects and be a favorite among ethical hackers.",
          quizType: 'multiple',
          quiz: {
            question: "What does SQLMap exploit?",
            options: ["Network ports", "SQL injection vulnerabilities", "Wireless signals"],
            correct: 1
          }
        },
        {
          content: "Nessus be the vulnerability hunter, a powerful scanner that identifies weaknesses in systems, networks, and applications. Like a keen-eyed lookout, it probes fer known vulnerabilities, misconfigurations, and potential entry points. Nessus uses a plugin architecture with thousands o' checks fer different vulnerabilities. It be developed by Tenable and be widely used in enterprise security assessments.<br /><br />With a vast database o' plugins, Nessus performs comprehensive scans and generates detailed reports. It's used by professionals fer security assessments. Without it, ye'd miss critical flaws! It can scan networks, web apps, and databases, providin' severity ratings and remediation advice. Nessus supports credentialed scannin' fer deeper analysis and can integrate with SIEM systems.<br /><br />Arm yerself with Nessus, pirates, and ye'll spot every weakness in yer target's armor. It be the scout o' the offensive world, guidin' ye to the soft spots fer maximum impact. Professional versions offer advanced features like compliance checkin' and integration with other security tools. Nessus has been a leader in vulnerability scannin' since 1998 and be trusted by organizations worldwide.",
          quizType: 'multiple',
          quiz: {
            question: "What is Nessus?",
            options: ["A password cracker", "A vulnerability scanner", "A packet sniffer"],
            correct: 1
          }
        },
        {
          content: "Nikto be the web server inspector, a scanner that checks fer outdated software, misconfigurations, and dangerous files on web servers. Like inspectin' a ship's hull fer leaks, it finds vulnerabilities that could sink yer target. Nikto scans fer over 6,700 potentially dangerous files and programs. It be open-source and written in Perl, makin' it lightweight and fast.<br /><br />This open-source tool performs thorough scans, testin' fer thousands o' potential issues. It's great fer reconnaissance before deeper attacks. Without Nikto, ye'd sail past hidden dangers! It can detect misconfigured servers, outdated software, and common web vulnerabilities. Nikto supports SSL and can scan multiple ports simultaneously.<br /><br />Use Nikto, ye vigilant voyagers, to map out web server weaknesses. It be the first mate in yer web attack crew, helpin' ye identify low-hangin' fruit and plan yer plunder. Combine it with other tools like Nmap fer comprehensive web server assessment. Nikto has been a staple in web security scannin' fer over two decades and remains relevant in modern assessments.",
          quizType: 'multiple',
          quiz: {
            question: "What does Nikto scan for?",
            options: ["Wireless networks", "Web server vulnerabilities", "Database schemas"],
            correct: 1
          }
        }
      ],
      advanced: [
        {
          content: "Ahoy, ye master plunderers! Advanced Persistent Threats (APTs) be the pinnacle o' cyber piracy, stealthy operations where ye gain unauthorized access to a network and linger undetected fer extended periods. Like a ghost ship hauntin' the seas, APTs be often backed by nation-states or criminal syndicates, targetin' high-value treasures like government secrets or corporate booty. These attacks involve meticulous reconnaissance, custom malware, and patient persistence, allowin' ye to exfiltrate data over time without raisin' alarms. APTs use zero-day exploits, sophisticated evasion techniques, and command-and-control channels to maintain control. In offensive security, masterin' APT tactics lets ye simulate real-world threats, test defenses against prolonged intrusions, and develop countermeasures. Without APT knowledge, ye'll be caught in the shallows, unable to breach fortified castles. So study these advanced threats, pirates, fer they be the ultimate test o' yer cyber prowess!",
          quizType: 'multiple',
          quiz: {
            question: "What is an APT?",
            options: ["A quick attack", "Advanced Persistent Threat", "A defensive tool"],
            correct: 1
          }
        },
        {
          content: "Shiver me circuits! Zero-day exploits be vulnerabilities unknown to the software vendor, givin' ye a window o' opportunity before patches be available. Like findin' a secret passage in a fortress wall, zero-days allow ye to breach defenses that no one else knows about. Attackers discover these through reverse engineerin', fuzzin', or accidental finds, then weaponize 'em fer devastating strikes. In offensive operations, zero-days be the holy grail, enablin' ye to bypass all known security measures. Ye can use 'em in targeted attacks, sell 'em on the black market, or keep 'em fer yer own arsenal. But beware, once used, the secret be out, and patches follow swiftly. Masterin' zero-day huntin' requires deep knowledge o' code, assembly, and system internals. Without this skill, ye'll be stuck with yesterday's weapons, unable to conquer modern fortresses. So sharpen yer code-breakin' skills, mateys, and claim the ultimate advantage in the cyber wars!",
          quizType: 'multiple',
          quiz: {
            question: "What is a zero-day exploit?",
            options: ["An old vulnerability", "Unknown vulnerability", "A patched bug"],
            correct: 1
          }
        },
        {
          content: "Walk the digital plank! Supply chain attacks be when ye compromise a trusted third-party provider to infiltrate yer true target, like poisonin' the water supply before a siege. By attackin' software vendors, update mechanisms, or hardware manufacturers, ye can insert backdoors or malware that spreads to countless victims. SolarWinds and Kaseya attacks be prime examples, where tainted updates infected thousands o' organizations. In offensive security, supply chain tactics allow ye to amplify yer impact with minimal effort, turnin' one breach into a fleet o' compromised ships. Ye can target build processes, source code repositories, or distribution channels. This approach be particularly effective against large enterprises with complex vendor ecosystems. Without supply chain mastery, ye'll be fightin' each battle individually, wastin' yer powder on small fry. So learn to poison the well, pirates, and watch yer enemies fall like dominoes!",
          quizType: 'multiple',
          quiz: {
            question: "What is a supply chain attack?",
            options: ["Attacking chains", "Compromising third parties", "Breaking links"],
            correct: 1
          }
        },
        {
          content: "Dead men tell no tales, but fileless malware does! This advanced technique runs entirely in memory, leavin' no traces on disk, like a ghost possessin' a ship without boardin' it. Fileless attacks use legitimate tools and processes, injectin' malicious code into runnin' applications or the operating system itself. PowerShell, WMI, and registry manipulation be common vectors, allowin' ye to execute payloads without droppin' files. In offensive operations, fileless malware evades traditional antivirus and endpoint detection, makin' it perfect fer stealthy persistence. Ye can use livin'-off-the-land techniques, combin' built-in tools fer malicious purposes. This approach be harder to detect and remove, as there's no file to quarantine. Without fileless mastery, ye'll leave footprints everywhere, alertin' the defenders to yer presence. So become the ghost in the machine, mateys, and strike without a trace!",
          quizType: 'multiple',
          quiz: {
            question: "What is fileless malware?",
            options: ["Malware with files", "Memory-only malware", "File-based virus"],
            correct: 1
          }
        },
        {
          content: "Hoist the Jolly Roger high! Livin' off the land (LotL) be the art o' usin' built-in system tools fer malicious purposes, like turnin' a ship's own cannons against its crew. Instead o' bringin' yer own weapons, ye repurpose legitimate software like PowerShell, net.exe, or schtasks.exe fer reconnaissance, lateral movement, and data exfiltration. This technique minimizes detection, as defenders rarely flag their own tools. In offensive security, LotL allows ye to blend in with normal network activity, makin' attribution nearly impossible. Ye can use cmdlets fer privilege escalation, scheduled tasks fer persistence, or network commands fer scannin'. Advanced LotL involves combin' multiple tools in complex chains. Without LotL skills, ye'll stand out like a sore thumb, easily spotted by vigilant sentries. So master the ship's own arsenal, pirates, and conquer from within!",
          quizType: 'multiple',
          quiz: {
            question: "What is living off the land?",
            options: ["Using external tools", "Repurposing built-in tools", "Living on land"],
            correct: 1
          }
        },
        {
          content: "Sail into the fog! Command and Control (C2) channels be the secret communications ye establish with compromised systems, like maintainin' radio contact with yer infiltrators. C2 allows ye to send commands, receive data, and maintain persistence in a breached network. Advanced C2 uses domain frontin', DNS tunneling, or HTTPS beacons to evade detection. Ye can use tools like Cobalt Strike or Empire fer sophisticated C2 frameworks. In offensive operations, robust C2 be crucial fer long-term access, data exfiltration, and pivotin' to new targets. Without proper C2, ye'll lose control o' yer beachheads, leavin' 'em vulnerable to reclamation. So establish yer command posts wisely, mateys, and rule the digital seas from the shadows!",
          quizType: 'multiple',
          quiz: {
            question: "What is C2 in cyber attacks?",
            options: ["Control center", "Command and Control channels", "Central command"],
            correct: 1
          }
        },
        {
          content: "Board all decks! Lateral movement be the process o' expandin' yer foothold within a network, jumpin' from one compromised system to another like swingin' from ship to ship. Once ye have initial access, ye use stolen credentials, pass-the-hash, or exploit vulnerabilities to move deeper into the network. Tools like Mimikatz fer credential dumpin' or PsExec fer remote execution be yer allies. In offensive security, lateral movement allows ye to reach high-value targets, escalate privileges, and maximize impact. Ye can use Active Directory enumeration, Kerberoasting, or RDP hijackin' techniques. Without lateral movement skills, ye'll be stuck at the perimeter, unable to plunder the inner vaults. So learn to navigate the network maze, pirates, and claim every treasure in sight!",
          quizType: 'multiple',
          quiz: {
            question: "What is lateral movement?",
            options: ["Moving sideways", "Expanding access within network", "Vertical climbing"],
            correct: 1
          }
        },
        {
          content: "Climb the mast to the top! Privilege escalation be the art o' gainin' higher access levels, from user to administrator, like risin' from deckhand to captain. Ye exploit misconfigurations, vulnerabilities, or weak permissions to elevate yer rights. Techniques include kernel exploits, DLL hijackin', or sudo abuse. In offensive operations, privilege escalation be essential fer full system control, data access, and further attacks. Tools like Dirty COW or EternalBlue have been legendary fer this purpose. Without escalation skills, ye'll remain a lowly swab, unable to command the ship. So seize the captain's chair, mateys, and rule with absolute power!",
          quizType: 'multiple',
          quiz: {
            question: "What is privilege escalation?",
            options: ["Lowering rights", "Gaining higher access", "Equal privileges"],
            correct: 1
          }
        },
        {
          content: "Weigh anchor and flee! Data exfiltration be the final stage o' the plunder, extractin' sensitive data from the compromised network like loadin' yer ship with stolen gold. Ye must do this stealthily to avoid detection, usin' encryption, compression, and covert channels. Techniques include DNS tunneling, HTTP POSTs, or USB devices. In offensive security, successful exfiltration completes the mission, but poor execution can alert defenders. Ye need to identify valuable data, compress it, encrypt it, and send it out in small chunks. Without exfiltration mastery, all yer hard work be fer naught, as the treasure remains trapped. So perfect yer getaway, pirates, and vanish with the booty!",
          quizType: 'multiple',
          quiz: {
            question: "What is data exfiltration?",
            options: ["Data entry", "Stealing data out", "Data storage"],
            correct: 1
          }
        },
        {
          content: "The grand heist! Ransomware be the ultimate extortion, encryptin' yer victim's data and demandin' ransom fer the key, like holdin' their treasure hostage. Advanced ransomware uses worm-like propagation, double extortion (stealin' data first), and evasion techniques to spread rapidly. WannaCry and Ryuk be infamous examples, cripplin' organizations worldwide. In offensive operations, deployin' ransomware can fund yer operations or cause maximum disruption. Ye combine it with data exfiltration fer double leverage. But beware, law enforcement be hot on yer trail. Without ransomware expertise, ye'll miss out on the big scores. So arm yerself with encryption cannons, mateys, and demand yer due from the cyber seas!",
          quizType: 'multiple',
          quiz: {
            question: "What is ransomware?",
            options: ["Free software", "Encrypting malware for ransom", "Antivirus"],
            correct: 1
          }
        }
      ]
    },
    defensive: {
      beginner: [
        {
          content: "Ahoy, ye scurvy dogs! Networks be the vast oceans o' connected devices, where ships sail through cables and wireless waves to share booty and secrets. In the world o' defensive cybersecurity, understandin' networkin' fundamentals be like knowin' the tides and currents – essential fer protectin' yer fleet from invaders. Networks connect computers, servers, and devices, allowin' 'em to communicate and share resources. Without proper networkin' knowledge, ye'll be sailin' blind, vulnerable to attacks from all sides.\n\nYe see, networks come in many forms: local area networks (LANs) fer small crews, wide area networks (WANs) fer vast empires, and the mighty internet connectin' all. Defensive pirates must master the art o' network topology, understandin' how switches, routers, and hubs guide the flow o' data like captains steerin' their ships. Protocols like TCP/IP be the language o' the seas, ensurin' reliable communication. But beware, misconfigurations can leave holes in yer hull, lettin' attackers slip through undetected.\n\nIn yer defensive quests, ye'll learn to segment networks, creatin' isolated compartments to contain breaches like bulkheads in a ship. Firewalls act as vigilant sentries, monitorin' traffic and blockin' suspicious vessels. Intrusion detection systems be yer lookouts, soundin' alarms at the first sign o' trouble. Master these networkin' arts, and ye'll build impenetrable fortresses on the digital waves, protectin' yer treasures from plunderers far and wide.",
          quizType: 'multiple',
          quiz: {
            question: "What is a network?",
            options: ["A type of boat", "Connected devices sharing resources", "A fishing net"],
            correct: 1
          }
        },
        {
          content: "Shiver me timbers! IP addressin' be the unique identifiers fer each device on the network, like the names carved on yer crew's cutlasses. IPv4 uses 32-bit addresses, while IPv6 expands to 128 bits fer the growin' fleet o' devices. In defensive cybersecurity, understandin' IP addressin' helps ye track intruders, set up access controls, and prevent unauthorized access. Subnettin' divides networks into smaller territories, makin' it easier to manage and secure.\n\nYe must learn to configure IP addresses properly, avoidin' conflicts that could disrupt yer communications. Dynamic Host Configuration Protocol (DHCP) automatically assigns addresses, but static ones be better fer critical systems. Network Address Translation (NAT) hides internal addresses from the outside world, like a cloak o' invisibility. But remember, attackers can spoof IPs to masquerade as trusted allies.\n\nDefensive strategies include usin' private IP ranges, implementin' VLANs fer isolation, and monitorin' address assignments. Tools like ARP tables help resolve IP to MAC addresses, revealin' potential poisonin' attacks. Master IP addressin', and ye'll navigate the network seas with confidence, spotin' threats before they strike and protectin' yer digital domain from cyber buccaneers.",
          quizType: 'multiple',
          quiz: {
            question: "What does IP stand for?",
            options: ["Internet Protocol", "Internal Password", "Instant Payment"],
            correct: 0
          }
        },
        {
          content: "Walk the plank if ye ignore switches and routers! These be the traffic directors o' the network, guidin' data packets like experienced helmsmen steerin' ships through treacherous waters. Switches operate at layer 2, usin' MAC addresses to forward frames within local networks. Routers work at layer 3, routin' packets between different networks usin' IP addresses. In defensive cybersecurity, understandin' these devices be crucial fer buildin' secure network architectures.\n\nYe'll learn to configure VLANs on switches to segment traffic, preventin' unauthorized access between departments. Port security limits which devices can connect, like restrictin' who boards yer ship. Router access control lists (ACLs) filter traffic based on rules, blockin' malicious packets. But beware o' misconfigurations that could create backdoors fer attackers.\n\nAdvanced defensive tactics include implementin' dynamic routin' protocols like OSPF or BGP, with proper authentication to prevent spoofin'. Network monitoring tools help detect unusual traffic patterns, indicatin' potential breaches. Quality o' Service (QoS) prioritizes critical traffic, ensurin' security systems always get through. Master switches and routers, and ye'll build resilient networks that withstand storms and repel invaders.",
          quizType: 'multiple',
          quiz: {
            question: "What is a router?",
            options: ["A type of switch", "Device routing traffic between networks", "A network cable"],
            correct: 1
          }
        },
        {
          content: "Dead men tell no tales, but DNS does! Domain Name System translates human-readable domain names into IP addresses, like a trusty map leadin' to hidden treasures. In defensive cybersecurity, DNS be both a vital service and a potential vulnerability. Ye must secure DNS servers against cache poisonin' attacks, where false records be inserted to redirect users to malicious sites. DNSSEC adds digital signatures to verify authenticity.\n\nYe'll learn to implement split-horizon DNS, servin' different records internally and externally. Rate limitin' prevents DNS amplification attacks, where attackers use yer server to flood targets. Monitorin' DNS queries helps detect command-and-control communications or data exfiltration attempts. Blackholin' malicious domains blocks access to known threats.\n\nDefensive strategies include usin' reputable DNS resolvers, implementin' DNS firewalls, and regularly auditin' zone files. Sinkholin' redirects malicious domains to harmless IPs, disruptin' botnet communications. Understand DNS tunneling, where data be hidden in DNS queries, and ye'll spot this stealthy exfiltration method. Master DNS defense, and ye'll keep yer crew navigatin' safely, avoidin' the reefs o' cyber deception.",
          quizType: 'multiple',
          quiz: {
            question: "What is DNS?",
            options: ["Domain Name System", "Data Network Service", "Digital Navigation System"],
            correct: 0
          }
        },
        {
          content: "Sail ho! Wireless networks be the open seas o' connectivity, convenient but fraught with dangers. Wi-Fi uses radio waves to connect devices without cables, but weak encryption leaves ye vulnerable to eavesdroppin' and man-in-the-middle attacks. In defensive cybersecurity, securin' wireless networks requires WPA3 encryption, strong passwords, and hidin' SSIDs. Ye must segment guest networks from internal ones.\n\nYe'll learn about wireless intrusion detection systems (WIDS) that monitor fer rogue access points and unauthorized connections. MAC filterin' restricts access, though it can be bypassed. Disable WPS (Wi-Fi Protected Setup) to prevent brute-force attacks. Regular site surveys detect hidden cameras or unauthorized devices.\n\nAdvanced defenses include implementin' 802.1X authentication with RADIUS servers, ensurin' only authorized devices connect. Monitor fer deauthentication attacks that disconnect users. Use captive portals fer guest access with time limits. VPNs encrypt wireless traffic end-to-end. Master wireless security, and ye'll turn yer Wi-Fi from a liability into a secure extension o' yer network fortress.",
          quizType: 'multiple',
          quiz: {
            question: "What is WPA3?",
            options: ["A wireless protocol", "Wi-Fi Protected Access 3", "A type of antenna"],
            correct: 1
          }
        },
        {
          content: "Heave ho! Network protocols be the rules governin' communication on the seas o' data. TCP ensures reliable delivery, while UDP prioritizes speed. ICMP be used fer diagnostics, but can be exploited in ping floods. In defensive cybersecurity, understandin' protocols helps ye configure firewalls and intrusion detection systems properly. Ye must know which ports be used by common services and block unnecessary ones.\n\nYe'll learn to implement protocol analyzers like Wireshark to inspect traffic, detectin' anomalies or malicious patterns. Secure protocols like HTTPS encrypt web traffic, while legacy ones like Telnet send data in plain text. Network segmentation uses protocols to isolate sensitive areas.\n\nDefensive tactics include deployin' next-generation firewalls that inspect protocol behavior, not just ports. Rate limitin' prevents protocol-based attacks like SYN floods. Deep packet inspection examines payload contents fer threats. Master network protocols, and ye'll speak the language o' the network fluently, identifyin' threats and enforcin' security policies with precision.",
          quizType: 'multiple',
          quiz: {
            question: "What does TCP stand for?",
            options: ["Transmission Control Protocol", "Total Computer Power", "Tech Control Panel"],
            correct: 0
          }
        },
        {
          content: "Avast, ye bilge rats! Network segmentation be dividin' yer network into isolated zones, like compartments in a ship preventin' one breach from sinkin' the whole vessel. VLANs create virtual separations on switches, while subnets do the same at layer 3. In defensive cybersecurity, segmentation limits lateral movement by attackers, containin' breaches to small areas. Ye must design networks with defense in depth.\n\nYe'll learn to implement zero-trust principles, verifyin' every access request regardless o' location. Micro-segmentation uses software-defined networkin' to create granular policies. Air gappin' physically separates critical systems. Network access control (NAC) enforces compliance before allowin' connections.\n\nAdvanced strategies include usin' software-defined perimeter (SDP) fer identity-based access. Regular penetration testin' validates segmentation effectiveness. Monitor east-west traffic within segments. Master network segmentation, and ye'll build a fortress where even if one wall falls, the castle remains secure.",
          quizType: 'multiple',
          quiz: {
            question: "What is network segmentation?",
            options: ["Dividing network into zones", "Connecting networks", "Measuring network speed"],
            correct: 0
          }
        },
        {
          content: "Walk the digital plank! Network monitoring be the vigilant watch o' yer cyber seas, detectin' threats before they strike. Tools like SNMP collect device statistics, while NetFlow analyzes traffic patterns. In defensive cybersecurity, continuous monitoring helps identify anomalies, such as unusual data flows or failed login attempts. Ye must set up centralized loggin' and correlation to spot attack patterns.\n\nYe'll learn to deploy network taps and span ports fer traffic capture. Intrusion detection systems (IDS) alert on known attack signatures. Security information and event management (SIEM) correlates logs from multiple sources. Packet analyzers like Wireshark dissect traffic fer forensic analysis.\n\nDefensive tactics include implementin' network behavior analysis to detect zero-day threats. Machine learnin' identifies abnormal patterns. Regular audits ensure monitorin' systems be workin' properly. Master network monitoring, and ye'll have eyes everywhere, anticipatin' and thwartin' attacks before they succeed.",
          quizType: 'multiple',
          quiz: {
            question: "What is network monitoring?",
            options: ["Watching TV", "Observing network activity", "Monitoring weather"],
            correct: 1
          }
        },
        {
          content: "Shiver me circuits! Cloud networkin' be the shiftin' skies o' modern connectivity, where services be hosted off-premise. Virtual private clouds (VPCs) create isolated environments in public clouds. In defensive cybersecurity, securin' cloud networks requires understandin' shared responsibility models – ye secure what ye control, the provider secures the infrastructure. Ye must configure security groups and network ACLs in AWS, or equivalent in other clouds.\n\nYe'll learn about cloud access security brokers (CASBs) that enforce policies across cloud services. Zero-trust network access (ZTNA) replaces VPNs with identity-based connections. Multi-cloud strategies require consistent security across platforms. Monitorin' cloud traffic differs from on-premises due to ephemeral nature.\n\nAdvanced defenses include implementin' cloud security posture management (CSPM) to detect misconfigurations. Serverless security focuses on function-level protections. Master cloud networking, and ye'll harness the power o' the clouds while keepin' yer data safe from digital storms.",
          quizType: 'multiple',
          quiz: {
            question: "What is a VPC?",
            options: ["Virtual Private Cloud", "Very Private Computer", "Visual Programming Code"],
            correct: 0
          }
        },
        {
          content: "Dead men tell no tales, but network forensics does! This be the art o' investigatin' network incidents, collectin' evidence fer prosecution or improvement. Packet captures, log files, and traffic analysis reveal attack timelines and methods. In defensive cybersecurity, havin' forensic capabilities deters attackers and helps recover from breaches. Ye must preserve evidence chains to maintain admissibility in court.\n\nYe'll learn to use tools like tcpdump fer packet capture and Wireshark fer analysis. Network time protocol (NTP) synchronization ensures accurate timelin's. Volatile memory capture preserves runnin' processes. Chain o' custody procedures maintain evidence integrity.\n\nDefensive strategies include implementin' network forensics platforms that automate evidence collection. Regular forensic readouts help tune defenses. Master network forensics, and ye'll not only repel attacks but learn from 'em, makin' yer network stronger with each battle.",
          quizType: 'multiple',
          quiz: {
            question: "What is network forensics?",
            options: ["Investigating network incidents", "Fixing network cables", "Designing networks"],
            correct: 0
          }
        }
      ],
      expert: Array(10).fill({
        content: "Encryption is the process of converting information or data into a code, especially to prevent unauthorized access. Encryption is one of the most important methods for providing data security, especially for end-to-end protection of data transmitted across networks. There are two main types: symmetric and asymmetric encryption.",
        quizType: 'multiple',
        quiz: {
          question: "What is encryption?",
          options: ["Hiding data", "Securing data with codes", "Deleting data"],
          correct: 1
        }
      }),
      advanced: [
        {
          content: "Zero Trust is a security model based on the principle 'never trust, always verify'. It assumes that threats could be internal or external and verifies each request as though it originates from an open network. Zero Trust requires strict identity verification for every person and device trying to access resources on a private network.",
          quizType: 'multiple',
          quiz: {
            question: "What is Zero Trust?",
            options: ["Trust everyone", "Never trust, always verify", "Trust once"],
            correct: 1
          }
        },
        {
          content: "Multi-factor authentication (MFA) is a security system that requires more than one method of authentication from independent categories of credentials to verify the user's identity for a login or other transaction. MFA adds an extra layer of security to the authentication process.",
          quizType: 'multiple',
          quiz: {
            question: "What is MFA?",
            options: ["Multiple file access", "Multi-factor authentication", "Mainframe application"],
            correct: 1
          }
        },
        {
          content: "Intrusion Detection Systems (IDS) are devices or software applications that monitor a network or systems for malicious activity or policy violations. IDS can be network-based or host-based and help in identifying potential incidents, logging information about them, and reporting attempts.",
          quizType: 'multiple',
          quiz: {
            question: "What is IDS?",
            options: ["Internet Data Service", "Intrusion Detection System", "Internal Development Software"],
            correct: 1
          }
        },
        {
          content: "Security Information and Event Management (SIEM) is a set of tools and services offering real-time analysis of security alerts generated by applications and network hardware. SIEM systems collect, normalize, and analyze log data from various sources to detect and respond to security threats.",
          quizType: 'multiple',
          quiz: {
            question: "What is SIEM?",
            options: ["System Information Exchange Manager", "Security Information and Event Management", "Software Integration and Enhancement Module"],
            correct: 1
          }
        },
        {
          content: "Endpoint Detection and Response (EDR) is an integrated endpoint security solution deployed and managed by a security operations center. EDR tools monitor endpoint and network events and record the information in a central database where further analysis, detection, investigation, reporting, and alerting take place.",
          quizType: 'multiple',
          quiz: {
            question: "What is EDR?",
            options: ["Electronic Data Retrieval", "Endpoint Detection and Response", "Emergency Disaster Recovery"],
            correct: 1
          }
        },
        {
          content: "Data Loss Prevention (DLP) is a set of tools and processes used to ensure that sensitive data is not lost, misused, or accessed by unauthorized users. DLP software classifies regulated, confidential, and business critical data and identifies violations of policies defined by organizations or within a predefined security policy.",
          quizType: 'multiple',
          quiz: {
            question: "What is DLP?",
            options: ["Data Link Protocol", "Data Loss Prevention", "Digital Library Project"],
            correct: 1
          }
        },
        {
          content: "Vulnerability scanning is an inspection of the potential points of exploit on a computer or network to identify security holes. A vulnerability scan detects and classifies system weaknesses in computers, networks, and communications equipment and predicts the effectiveness of countermeasures.",
          quizType: 'multiple',
          quiz: {
            question: "What is vulnerability scanning?",
            options: ["Scanning for viruses", "Inspecting for security holes", "Checking network speed"],
            correct: 1
          }
        },
        {
          content: "Incident response is an organized approach to addressing and managing the aftermath of a security breach or cyberattack. The goal is to handle the situation in a way that limits damage and reduces recovery time and costs. Incident response includes preparation, identification, containment, eradication, recovery, and lessons learned.",
          quizType: 'multiple',
          quiz: {
            question: "What is incident response?",
            options: ["Responding to customer complaints", "Managing security breaches", "Handling network outages"],
            correct: 1
          }
        },
        {
          content: "Compliance refers to the process of adhering to internal standards and external regulations. In cybersecurity, compliance ensures that organizations meet legal, regulatory, and industry standards for data protection and security practices. Non-compliance can result in fines, legal action, and reputational damage.",
          quizType: 'multiple',
          quiz: {
            question: "What is compliance in cybersecurity?",
            options: ["Following fashion trends", "Adhering to security standards", "Complying with software licenses"],
            correct: 1
          }
        },
        {
          content: "Risk assessment is the process of identifying, analyzing, and prioritizing risks followed by coordinated and economical application of resources to minimize, monitor, and control the probability or impact of unfortunate events. In cybersecurity, risk assessment helps organizations understand their security posture and make informed decisions about risk mitigation.",
          quizType: 'multiple',
          quiz: {
            question: "What is risk assessment?",
            options: ["Evaluating financial risks", "Identifying and analyzing security risks", "Assessing employee performance"],
            correct: 1
          }
        }
      ]
    }
  };

  const currentLevels = levelData[type][level];

  const bgSrc = '/piratemap.png';

  const bgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1
  };

  const levelPositions = [
    { level: 1, icon: "Straw Hat", x: "19%", y: "31%" },
    { level: 2, icon: "Ship Wheel", x: "26%", y: "31%" },
    { level: 3, icon: "Bug/Virus", x: "21%", y: "59%" },
    { level: 4, icon: "Chest/Locker", x: "34%", y: "64%" },
    { level: 5, icon: "Target/Eye", x: "38%", y: "44%" },
    { level: 6, icon: "Lock", x: "49%", y: "61%" },
    { level: 7, icon: "Circuit Board", x: "50%", y: "42%" },
    { level: 8, icon: "CPU/Brain", x: "64%", y: "52%" },
    { level: 9, icon: "Jolly Roger", x: "73%", y: "62%" },
    { level: 10, icon: "Treasure Chest", x: "83%", y: "63%" }
  ];

  const icons = ['🏴‍☠️', '⚓', '🐛', '📦', '🎯', '🔒', '🔌', '🧠', '🏴‍☠️', '💰'];

  const handleLevelClick = (index) => {
    if (index === 0 || challengeLevels[type][level][index - 1]) {
      setSelectedLevel(index);
      setShowContent(true);
      setShowQuiz(false);
      setQuizIndex(0);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setGameSequence(shuffle([1,2,3]));
    setGameIndex(0);
    setQuizIndex(0);
  };

  const handleGameClick = (num) => {
    if (num === gameSequence[gameIndex]) {
      if (gameIndex === 2) {
        setShowCongrats(true);
        updateChallengeLevel(type, level, selectedLevel, true);
        if (selectedLevel === 9) {
          unlockNext(type, level);
        }
        setTimeout(() => {
          setConfettiActive(true);
        }, 1000);
        setTimeout(() => {
          setConfettiActive(false);
          setShowCongrats(false);
          setShowContent(false);
          setShowQuiz(false);
          if (selectedLevel === 9 && level === 'advanced') {
            setShowCompletionMessages(true);
          } else if (selectedLevel === 9) {
            navigate(`/${type}-quests`);
          }
          setSelectedLevel(null);
        }, 4000);
      } else {
        setGameIndex(prev => prev + 1);
      }
    } else {
      alert("Wrong order! Start over");
      setGameIndex(0);
    }
  };

  const handleAnswer = (i) => {
    setUserAnswer(i);
    const quiz = currentLevels[selectedLevel].quiz;
    const correct = Array.isArray(quiz) ? quiz[quizIndex].correct : quiz.correct;
    if (i === correct) {
      if (Array.isArray(quiz) && quizIndex < quiz.length - 1) {
        setQuizIndex(prev => prev + 1);
        setUserAnswer(-1);
      } else {
        setConfettiActive(true);
        setShowCongrats(true);
        updateChallengeLevel(type, level, selectedLevel, true);
        if (selectedLevel === 9) {
          unlockNext(type, level);
        }
        setTimeout(() => {
          setConfettiActive(false);
          setShowCongrats(false);
          setShowContent(false);
          setShowQuiz(false);
          if (selectedLevel === 9 && level === 'advanced') {
            setShowCompletionMessages(true);
          } else if (selectedLevel === 9) {
            navigate(`/${type}-quests`);
          }
          setSelectedLevel(null);
        }, 3000);
      }
    } else {
      alert("Wrong answer! Try again");
      setUserAnswer(-1);
    }
  };

  // Determine the current level index (next available level)
  let currentLevelIndex = -1;
  for (let i = 0; i < 10; i++) {
    if (i === 0 || challengeLevels[type][level][i - 1]) {
      if (!challengeLevels[type][level][i]) {
        currentLevelIndex = i;
        break;
      }
    }
  }

  return (
    <>
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <div style={{
        position: 'relative',
        height: '100vh',
        color: 'white'
      }}>
      <img
        src={bgSrc}
        alt="Background"
        style={bgStyle}
      />
      <button
        onClick={() => navigate(`/${type}-quests`)}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          zIndex: 10
        }}
      >
        Back to Quest
      </button>
      <button
        onClick={() => navigate('/workspace')}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          zIndex: 10
        }}
      >
        My Workspace
      </button>

      <h1 style={{
        position: 'absolute',
        top: type === 'offensive' || type === 'defensive' ? '25%' : '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'OnePieceFont', serif",
        fontSize: type === 'offensive' || type === 'defensive' ? '4rem' : '1.2rem',
        fontWeight: 'bold',
        zIndex: 10,
        textShadow: type === 'offensive' || type === 'defensive' ? '0 0 20px rgba(0,0,0,0.5)' : 'none'
      }}>{displayedTitle}</h1>

      <div style={{
        position: 'absolute',
        top: type === 'offensive' || (type === 'defensive' && level === 'beginner') ? '70%' : '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '4rem',
        maxWidth: '800px'
      }}>
        {Array.from({length: 10}, (_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {i === currentLevelIndex && (
                <img
                  src="/sunny.png"
                  alt="Sunny"
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%) scaleX(-1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    zIndex: 5
                  }}
                />
              )}
              <button
                onClick={() => handleLevelClick(i)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: (level === 'beginner' || level === 'expert' || level === 'advanced') ? `url(/onepiecelogo.jpg)` : 'limegreen',
                  backgroundSize: (level === 'beginner' || level === 'expert' || level === 'advanced') ? 'cover' : 'auto',
                  backgroundPosition: (level === 'beginner' || level === 'expert' || level === 'advanced') ? 'center' : 'auto',
                  color: (level === 'beginner' || level === 'expert' || level === 'advanced') ? 'black' : 'white',
                  border: challengeLevels[type][level][i] ? '2px solid green' : i === currentLevelIndex ? '2px solid yellow' : '2px solid orange',
                  fontSize: '1.5rem',
                  fontFamily: "'OnePieceFont', serif",
                  cursor: (i === 0 || challengeLevels[type][level][i - 1]) ? 'pointer' : 'not-allowed',
                  opacity: challengeLevels[type][level][i] ? 1 : (i === 0 || challengeLevels[type][level][i - 1]) ? 1 : 0.5,
                  animation: i === currentLevelIndex ? 'pulse 2s infinite' : 'none',
                  boxShadow: challengeLevels[type][level][i] ? '0 0 15px green' : i === currentLevelIndex ? '0 0 15px yellow' : '0 0 15px orange',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
              </button>
            </div>
            <div style={{
              marginTop: '5px',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              padding: '2px 5px',
              borderRadius: '3px',
              fontSize: '0.8rem',
              fontFamily: "'OnePieceFont', serif"
            }}>
              Level {i + 1}
            </div>
          </div>
        ))}
      </div>

      {showContent && selectedLevel !== null && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '800px',
          zIndex: 20
        }}>
          <button
            onClick={() => {
              setShowContent(false);
              setSelectedLevel(null);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h2>Level {selectedLevel + 1}</h2>
          <div dangerouslySetInnerHTML={{__html: currentLevels[selectedLevel].content.replace(/\n/g, '<br />')}} />
          {!showQuiz && (
            <button onClick={handleStartQuiz} style={{
              background: 'blue',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Start Quiz</button>
          )}
        </div>
      )}

      {showQuiz && selectedLevel !== null && currentLevels[selectedLevel] && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '800px',
          zIndex: 20
        }}>
          <button
            onClick={() => {
              setShowQuiz(false);
              setSelectedLevel(null);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          {currentLevels[selectedLevel].quizType === 'multiple' && (
            <>
              <h3>{Array.isArray(currentLevels[selectedLevel].quiz) ? currentLevels[selectedLevel].quiz[quizIndex].question : currentLevels[selectedLevel].quiz.question}</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {(Array.isArray(currentLevels[selectedLevel].quiz) ? currentLevels[selectedLevel].quiz[quizIndex].options : currentLevels[selectedLevel].quiz.options).map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'guess' && (
            <>
              <h3>Guess the term: {currentLevels[selectedLevel].quiz.hint}</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {currentLevels[selectedLevel].quiz.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'memory' && (
            <>
              <h3>Arrange the numbers in order: Click {gameSequence[gameIndex]}</h3>
              <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                {[1,2,3].map(num => (
                  <button key={num} onClick={() => handleGameClick(num)} style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem',
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px'
                  }}>
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'match' && (
            <>
              <h3>Match the terms with definitions</h3>
              {currentLevels[selectedLevel].quiz.pairs.map((pair, i) => (
                <div key={i} style={{marginBottom: '1rem'}}>
                  <strong>{pair.term}:</strong> {pair.definition}
                </div>
              ))}
              <button onClick={() => {
                setConfettiActive(true);
                updateChallengeLevel(type, level, selectedLevel, true);
                setTimeout(() => {
                  setConfettiActive(false);
                  setShowContent(false);
                  setShowQuiz(false);
                  setSelectedLevel(null);
                }, 3000);
              }} style={{
                background: 'blue',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>Done</button>
            </>
          )}
        </div>
      )}

      {confettiActive && <Confetti numberOfPieces={300} recycle={false} />}

      {showCongrats && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.9)',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 30,
          color: 'green',
          fontSize: '2rem',
          fontFamily: "'OnePieceFont', serif"
        }}>
          Congratulations! Level Completed!
        </div>
      )}

      {blurScreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'black',
          zIndex: 35
        }} />
      )}

      {completionMessages.map((msg) => (
        <div
          key={msg.id}
          style={{
            position: 'absolute',
            top: msg.y,
            left: msg.x,
            color: 'red',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: "'OnePieceFont', serif",
            zIndex: 40,
            opacity: msg.visible ? 1 : 0,
            transition: 'opacity 0.5s',
            animation: msg.visible ? 'popIn 0.5s ease-out' : 'none'
          }}
        >
          {msg.text}
        </div>
      ))}

      {finalMessage && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.9)',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 50,
          color: 'gold',
          fontSize: '3rem',
          fontFamily: "'OnePieceFont', serif",
          textShadow: '0 0 20px gold'
        }}>
          YOU HAVE SUCCESSFULLY COMPLETED THE CYBER QUEST
        </div>
      )}

    </div>
    </>
  );
};

export default ChallengePage;
