import logoNeurobagel from '../assets/logo.svg';
import logoEnigmaPd from '../assets/adoption/enimgapd.png';
import logoScand from '../assets/adoption/scand.svg';
import logoAsmq from '../assets/adoption/asmq.png';
import logoNichy from '../assets/adoption/nichy.svg';
import logoEnigmaAddiction from '../assets/adoption/enigma_addiction.svg';
import logoNeuroAd from '../assets/adoption/neuro_ad.svg';
import logoMnd from '../assets/adoption/mnd_network.svg';
import logoTrr379 from '../assets/adoption/trr379.png';
import logoEnigmaTremor from '../assets/adoption/enigma_tremor.svg';
import logoOpenNeuro from '../assets/adoption/openneuro.svg';
import logoObi from '../assets/adoption/obi.png';
import logoDouglas from '../assets/adoption/douglas.png';
import logoEbrains from '../assets/adoption/ebrains.svg';
import logoIndi from '../assets/adoption/indi.png';
import logoShanoir from '../assets/adoption/shanoir.png';
import logoAnc from '../assets/adoption/anc.svg';
import logoPublicNeuro from '../assets/adoption/publicneuro.png';
import logoTosi from '../assets/adoption/tosi.png';
import logoAumc from '../assets/adoption/aumc.png';
import logoUmcg from '../assets/adoption/umcg.jpg';
import logoRadboud from '../assets/adoption/radboud.svg';
import logoMcgill from '../assets/adoption/mcgill.png';
import logoCamh from '../assets/adoption/camh.png';
import logoCervo from '../assets/adoption/cervo.png';
import logoIusmm from '../assets/adoption/iusmm.png';
import logoParkinsonNl from '../assets/adoption/parkinsonnl.svg';

export type CommunityStatus = 'active' | 'onboarding' | 'prospective';
export type CommunityType = 'public' | 'consortium';

export interface Coordinator {
  name: string;
  role: string;
  affiliation: string;
  url?: string;
  quote?: string;
  avatarUrl?: string;
}

export interface PartnerOrg {
  name: string;
  logo: string;
  url?: string;
}

export interface CommunityStats {
  datasetsCount: number;
  subjectsCount: number;
  nodesCount: number;
}

export interface MapCoordinates {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface Community {
  id: string;
  name: string;
  shortName: string;
  piName?: string;
  logo: string;
  tagline: string;
  description: string;
  category: string;
  communityType: CommunityType;
  portalUrl?: string;
  status: CommunityStatus;
  statusLabel?: string;
  themeColor: string;
  themeAccent: string;
  countryCodes: string[];
  coordinates: MapCoordinates;
  stats: CommunityStats;
  coordinators: Coordinator[];
  institutes: string[];
  partnerOrgs?: PartnerOrg[];
  domains: string[];
  bannerBadge?: string;
}

export const COMMUNITIES: Community[] = [
  {
    id: 'neurobagel-central',
    name: 'Neurobagel Public Federation',
    shortName: 'Neurobagel',
    piName: '',
    logo: logoNeurobagel,
    tagline: 'Global Open Science Neuroimaging Federation',
    description:
      'The central open federated search portal querying openly accessible neuroimaging repositories worldwide, adhering to BIDS and standardized clinical vocabularies.',
    category: 'Open Science Federation',
    communityType: 'public',
    portalUrl: 'https://query.neurobagel.org',
    status: 'active',
    statusLabel: 'Live Query Portal',
    themeColor: '#7e56c2',
    themeAccent: 'from-[#7e56c2] to-purple-800',
    countryCodes: [],
    coordinates: {
      lat: 45.5017,
      lng: -73.5673,
      city: 'Global Federation',
      country: 'Open Network',
    },
    stats: {
      datasetsCount: 1140,
      subjectsCount: 69607,
      nodesCount: 8,
    },
    coordinators: [],
    institutes: [
      'OpenNeuro',
      'EBRAINS',
      'Austrian Neurocloud (ANC)',
      'INDI Data-sharing Initiative',
      'Shanoir (INRIA / IRISA)',
      'PublicnEUro',
      'Ontario Brain Institute',
      'The Neuro (TOSI)',
    ],
    partnerOrgs: [
      {
        name: 'OpenNeuro',
        logo: logoOpenNeuro,
        url: 'https://openneuro.org',
      },
      {
        name: 'EBRAINS',
        logo: logoEbrains,
        url: 'https://ebrains.eu',
      },
      {
        name: 'ANC',
        logo: logoAnc,
        url: 'https://anc.plus.ac.at',
      },
      {
        name: 'INDI',
        logo: logoIndi,
        url: 'https://fcon_1000.projects.nitrc.org',
      },
      {
        name: 'Shanoir',
        logo: logoShanoir,
        url: 'https://shanoir.irisa.fr',
      },
      {
        name: 'PublicnEUro',
        logo: logoPublicNeuro,
        url: 'https://publicneuro.eu',
      },
      {
        name: 'Ontario Brain Institute',
        logo: logoObi,
        url: 'https://braininstitute.ca',
      },
      {
        name: 'TOSI Neuro',
        logo: logoTosi,
        url: 'https://www.mcgill.ca/neuro/open-science',
      },
    ],
    domains: ['Open Science', 'Multimodal Neuroimaging', 'Brain Informatics', 'BIDS Standards'],
    bannerBadge: 'Central Hub',
  },
  {
    id: 'enigma-pd',
    name: "ENIGMA-Parkinson's Disease",
    shortName: 'ENIGMA-PD',
    piName: 'Prof. Ysbrand van der Werf',
    logo: logoEnigmaPd,
    tagline: "Worldwide Consortium for Parkinson's Disease Neuroimaging",
    description:
      "International working group harmonizing clinical, genetic, and neuroimaging data across dozens of patient cohorts globally to discover robust imaging biomarkers of Parkinson's progression.",
    category: 'Disease Consortium',
    communityType: 'consortium',
    portalUrl: 'https://enigma.neurobagel.org/?node=All',
    status: 'active',
    statusLabel: 'Live Query Portal',
    themeColor: '#f59e0b',
    themeAccent: 'from-amber-500 to-orange-600',
    countryCodes: ['NL'],
    coordinates: {
      lat: 52.3676,
      lng: 4.9041,
      city: 'Amsterdam',
      country: 'Netherlands',
    },
    stats: {
      datasetsCount: 12,
      subjectsCount: 2151,
      nodesCount: 4,
    },
    coordinators: [
      {
        name: 'Prof. Ysbrand van der Werf',
        role: 'Principal Investigator',
        affiliation: 'Amsterdam UMC / NIN',
        url: 'https://www.amsterdamumc.org/en/research/researchers/ysbrand-van-der-werf',
        quote:
          'Early adoption of federated querying has accelerated how ENIGMA cohorts identify matched longitudinal cohorts.',
      },
      {
        name: 'Prof. Paul M. Thompson',
        role: 'Principal Investigator',
        affiliation: 'USC Keck School of Medicine',
        url: 'https://keck.usc.edu/faculty-search/paul-m-thompson/',
      },
      {
        name: 'Prof. Neda Jahanshad',
        role: 'Working Group Lead',
        affiliation: 'USC Keck School of Medicine',
        url: 'https://keck.usc.edu/faculty-search/neda-jahanshad/',
      },
      {
        name: 'Eva van Heese',
        role: 'Research Coordinator',
        affiliation: 'Amsterdam UMC',
        url: 'https://www.amsterdamumc.org/en/research/researchers/eva-van-heese',
      },
      {
        name: 'Emile d’Angremont',
        role: 'Data Lead',
        affiliation: 'Amsterdam UMC',
        url: 'https://www.amsterdamumc.org/en/research/researchers/emile-dangremont',
      },
    ],
    institutes: ['Amsterdam UMC', 'Groningen UMC', 'Radboud UMC', 'McGill University'],
    partnerOrgs: [
      {
        name: 'Amsterdam UMC',
        logo: logoAumc,
        url: 'https://www.amsterdamumc.org',
      },
      {
        name: 'Groningen UMC',
        logo: logoUmcg,
        url: 'https://www.umcg.nl',
      },
      {
        name: 'Radboud UMC',
        logo: logoRadboud,
        url: 'https://www.radboudumc.nl',
      },
      {
        name: 'McGill',
        logo: logoMcgill,
        url: 'https://www.mcgill.ca',
      },
    ],
    domains: [
      'Movement Disorders',
      "Parkinson's Disease",
      'Longitudinal MRI',
      'Clinical Phenotyping',
    ],
    bannerBadge: 'Early Adopter',
  },
  {
    id: 'scand',
    name: 'Schizophrenia Canadian Neuroimaging Database (SCanD)',
    shortName: 'SCAND',
    piName: 'Dr. Erin Dickie',
    logo: logoScand,
    tagline: 'Canadian Schizophrenia Neuroimaging Database',
    description:
      'Canadian multi-center research alliance connecting psychiatric and mental health institutions to harmonize and federate schizophrenia neuroimaging datasets across Canada.',
    category: 'National Consortium',
    communityType: 'consortium',
    portalUrl: 'https://scand.neurobagel.org/?node=All',
    status: 'active',
    statusLabel: 'Live Query Portal',
    themeColor: '#10b981',
    themeAccent: 'from-emerald-500 to-teal-700',
    countryCodes: ['CA'],
    coordinates: {
      lat: 43.6532,
      lng: -79.3832,
      city: 'Toronto',
      country: 'Canada',
    },
    stats: {
      datasetsCount: 7,
      subjectsCount: 1190,
      nodesCount: 1,
    },
    coordinators: [
      {
        name: 'Dr. Erin Dickie',
        role: 'Principal Investigator',
        affiliation: 'Centre for Addiction and Mental Health (CAMH) / University of Toronto',
        url: 'https://www.camh.ca/en/science-and-research/science-and-research-staff-directory/erindickie',
      },
      {
        name: 'Dr. Colin Hawco',
        role: 'Co-Investigator',
        affiliation: 'Centre for Addiction and Mental Health (CAMH) / University of Toronto',
        url: 'https://www.camh.ca/en/science-and-research/science-and-research-staff-directory/colinhawco',
      },
    ],
    institutes: ['Centre for Addiction and Mental Health (CAMH)', 'University of Toronto'],
    partnerOrgs: [
      {
        name: 'CAMH',
        logo: logoCamh,
        url: 'https://www.camh.ca',
      },
    ],
    domains: ['Schizophrenia', 'Psychiatry', 'Brain Informatics', 'Canadian Cohorts'],
    bannerBadge: 'Canadian Hub',
  },
  {
    id: 'asmq',
    name: 'Alliance en santé mentale du Québec (ASMQ)',
    shortName: 'ASMQ',
    piName: 'Dr. Vincent Taschereau-Dumouchel',
    logo: logoAsmq,
    tagline: 'Quebec Mental Health Neuroinformatics Infrastructure',
    description:
      'FRQS-supported strategic platform connecting psychiatry departments, biobanks, and imaging facilities across Quebec to empower psychiatric cohort discovery with strict patient confidentiality.',
    category: 'Provincial Platform',
    communityType: 'consortium',
    portalUrl: 'https://neurobagel-alliancefrqs.douglasneuroinformatics.ca/?node=All',
    status: 'active',
    statusLabel: 'Live Query Portal',
    themeColor: '#8b5cf6',
    themeAccent: 'from-purple-500 to-indigo-700',
    countryCodes: ['CA'],
    coordinates: {
      lat: 45.4414,
      lng: -73.5855,
      city: 'Montreal',
      country: 'Canada (Quebec)',
    },
    stats: {
      datasetsCount: 5,
      subjectsCount: 2849,
      nodesCount: 3,
    },
    coordinators: [
      {
        name: 'Dr. Vincent Taschereau-Dumouchel',
        role: 'Scientific Director & Co-Chair',
        affiliation: 'Université de Montréal',
        url: 'https://recherche.umontreal.ca/english/our-researchers/professors-directory/researcher/is/in34773/',
      },
      {
        name: 'Cécile Le Page',
        role: 'Data Platform Coordinator',
        affiliation: 'McGill University / Douglas Research Centre',
        url: 'https://www.linkedin.com/in/c%C3%A9cile-le-page-2787ba25/',
      },
    ],
    institutes: ['Douglas Research Centre', 'CERVO Research Centre', 'IUSMM Research Centre'],
    partnerOrgs: [
      {
        name: 'Douglas Research Centre',
        logo: logoDouglas,
        url: 'https://douglas.research.mcgill.ca',
      },
      {
        name: 'CERVO Research Centre',
        logo: logoCervo,
        url: 'https://cervo.ulaval.ca',
      },
      {
        name: 'IUSMM Research Centre',
        logo: logoIusmm,
        url: 'https://criusmm.ciusss-estmtl.gouv.qc.ca',
      },
    ],
    domains: ['Psychiatry', 'Mood & Psychosis', 'Clinical Biobanking', 'Quebec Health Governance'],
    bannerBadge: 'FRQS Network',
  },
  {
    id: 'dutch-npc',
    name: 'Netherlands Parkinson Cohort (NPC)',
    shortName: 'Dutch NPC',
    piName: "Dr. Emile d'Angremont",
    logo: logoParkinsonNl,
    tagline: 'Nationwide Dutch Parkinson Research Federation',
    description:
      'Nationwide consortium bringing together major Dutch academic medical centers to federate patient registries, wearables, and deep brain imaging data.',
    category: 'National Coalition',
    communityType: 'consortium',
    portalUrl: 'https://npc.neurobagel.org/',
    status: 'active',
    statusLabel: 'Live Query Portal',
    themeColor: '#f97316',
    themeAccent: 'from-orange-500 to-red-600',
    countryCodes: ['NL'],
    coordinates: {
      lat: 52.3676,
      lng: 4.9041,
      city: 'Amsterdam / Nijmegen',
      country: 'Netherlands',
    },
    stats: {
      datasetsCount: 2,
      subjectsCount: 691,
      nodesCount: 2,
    },
    coordinators: [
      {
        name: "Dr. Emile d'Angremont",
        role: 'Coordinator & Lead',
        affiliation: 'Amsterdam UMC',
        url: 'https://www.amsterdamumc.org/en/research/researchers/emile-dangremont',
      },
      {
        name: 'Prof. Wilma van de Berg',
        role: 'Principal Investigator',
        affiliation: 'Amsterdam UMC',
        url: 'https://www.amsterdamumc.org/en/research/researchers/wilma-van-de-berg',
      },
      {
        name: 'Prof. Teus van Laar',
        role: 'Investigator',
        affiliation: 'UMC Groningen',
        url: 'https://www.michaeljfox.org/researcher/teus-van-laar-md-phd',
      },
      {
        name: 'Dr. Chris Vriend',
        role: 'Investigator',
        affiliation: 'Amsterdam UMC',
        url: 'https://www.amsterdamumc.org/en/research/researchers/chris-vriend',
      },
    ],
    institutes: [
      'DUtch PARkinson Cohort (DUPARC)',
      'Personalized Parkinson Project (PPP)',
      'Amsterdam UMC',
      'Radboud University Medical Center',
    ],
    partnerOrgs: [
      {
        name: 'ParkinsonNL',
        logo: logoParkinsonNl,
        url: 'https://www.parkinsonnederland.nl',
      },
    ],
    domains: ['ParkinsonNet', 'Digital Biomarkers', 'Clinical Registries', 'Multi-center Trials'],
    bannerBadge: 'National Hub',
  },
  {
    id: 'trr379',
    name: 'TRR379 (Transregional Collaborative Research Center 379)',
    shortName: 'TRR379',
    piName: 'Prof. Michael Hanke & Prof. Andreas Meyer-Lindenberg',
    logo: logoTrr379,
    tagline: 'Collaborative Research Center for Affective Disorders',
    description:
      'German Research Foundation (DFG) Transregio consortium investigating the neurobiology of phenotypic impairments in affective disorders across multiple university clinics.',
    category: 'Academic Research Center',
    communityType: 'consortium',
    status: 'onboarding',
    statusLabel: 'Onboarding Nodes',
    themeColor: '#06b6d4',
    themeAccent: 'from-cyan-500 to-blue-600',
    countryCodes: ['DE'],
    coordinates: {
      lat: 50.7753,
      lng: 6.0839,
      city: 'Aachen / Frankfurt / Jülich',
      country: 'Germany',
    },
    stats: {
      datasetsCount: 7,
      subjectsCount: 1650,
      nodesCount: 3,
    },
    coordinators: [
      {
        name: 'Prof. Michael Hanke',
        role: 'Informatics Lead & PI',
        affiliation: 'Forschungszentrum Jülich / Heinrich Heine University Düsseldorf',
        url: 'https://www.trr379.de/contributors/michael-hanke/',
      },
      {
        name: 'Prof. Andreas Meyer-Lindenberg',
        role: 'Speaker & PI',
        affiliation: 'Central Institute of Mental Health Mannheim',
        url: 'https://www.trr379.de/contributors/andreas-meyer-lindenberg/',
      },
    ],
    institutes: [
      'RWTH Aachen University Hospital',
      'Philipps-Universität Marburg',
      'Goethe University Frankfurt',
      'Forschungszentrum Jülich',
    ],
    domains: [
      'Affective Neuroscience',
      'Major Depression',
      'fMRI & Spectroscopy',
      'DFG Transregio',
    ],
    bannerBadge: 'DFG Transregio',
  },
  {
    id: 'nichy',
    name: 'NIC-HE (Chilean Neuroimaging Consortium)',
    shortName: 'Nichy',
    piName: 'Dr. Pablo Billeke',
    logo: logoNichy,
    tagline: 'Latin American Clinical Neuroinformatics Initiative',
    description:
      'Emerging consortium uniting Chilean medical centers and research universities to establish harmonized brain data sharing and federated queries across South America.',
    category: 'Regional Initiative',
    communityType: 'consortium',
    status: 'prospective',
    statusLabel: 'Prospective Community',
    themeColor: '#ec4899',
    themeAccent: 'from-pink-500 to-rose-600',
    countryCodes: ['CL'],
    coordinates: {
      lat: -33.4489,
      lng: -70.6693,
      city: 'Santiago',
      country: 'Chile',
    },
    stats: {
      datasetsCount: 5,
      subjectsCount: 920,
      nodesCount: 2,
    },
    coordinators: [
      {
        name: 'Dr. Pablo Billeke',
        role: 'Consortium Lead',
        affiliation: 'Centro de Investigación en Complejidad Social (CICS)',
      },
    ],
    institutes: [
      'Pontificia Universidad Católica de Chile',
      'Universidad de Chile',
      'Clínica Alemana de Santiago',
    ],
    domains: ['Latin American Cohorts', 'Clinical EEG & MRI', 'Neurodevelopment'],
    bannerBadge: 'South America',
  },
  {
    id: 'enigma-addiction',
    name: 'ENIGMA-Addiction Working Group',
    shortName: 'ENIGMA-Addiction',
    piName: 'Prof. Hugh Garavan',
    logo: logoEnigmaAddiction,
    tagline: 'Global Consortium on Substance Use Disorders',
    description:
      'Worldwide effort pooling structural and functional brain MRI from thousands of individuals with alcohol, nicotine, cannabis, and opioid dependencies across 30+ sites.',
    category: 'Disease Consortium',
    communityType: 'consortium',
    status: 'prospective',
    statusLabel: 'Prospective Community',
    themeColor: '#e11d48',
    themeAccent: 'from-rose-500 to-red-700',
    countryCodes: ['US', 'NL', 'DE'],
    coordinates: {
      lat: 44.4759,
      lng: -73.2121,
      city: 'Burlington & Global',
      country: 'USA / International',
    },
    stats: {
      datasetsCount: 16,
      subjectsCount: 3850,
      nodesCount: 6,
    },
    coordinators: [
      {
        name: 'Prof. Hugh Garavan',
        role: 'Working Group Co-Chair',
        affiliation: 'University of Vermont',
      },
      {
        name: 'Dr. Janna Cousijn',
        role: 'Working Group Co-Chair',
        affiliation: 'Erasmus University Rotterdam',
      },
    ],
    institutes: [
      'University of Vermont',
      'Amsterdam UMC',
      'Icahn School of Medicine at Mount Sinai',
      "King's College London",
    ],
    domains: [
      'Substance Use Disorders',
      'Addiction Biomarkers',
      'Diffusion Tensor Imaging',
      'Subcortical Volumes',
    ],
    bannerBadge: 'Global Working Group',
  },
  {
    id: 'neuro-ad',
    name: 'NEURO-AD (NEURO Alzheimer’s Disease)',
    shortName: 'NEURO-AD',
    piName: 'Dr. Baptiste Couvy-Duchesne',
    logo: logoNeuroAd,
    tagline: 'Australian Biomarker & Preclinical AD Network',
    description:
      "Collaborative multi-cohort initiative standardizing early cognitive biomarker discovery, amyloid/tau PET, and CSF measures in preclinical Alzheimer's populations.",
    category: 'Disease Consortium',
    communityType: 'consortium',
    status: 'prospective',
    statusLabel: 'Prospective Community',
    themeColor: '#6366f1',
    themeAccent: 'from-indigo-500 to-violet-700',
    countryCodes: ['AU'],
    coordinates: {
      lat: -27.4698,
      lng: 153.0251,
      city: 'Brisbane',
      country: 'Australia',
    },
    stats: {
      datasetsCount: 9,
      subjectsCount: 2450,
      nodesCount: 4,
    },
    coordinators: [
      {
        name: 'Dr. Baptiste Couvy-Duchesne',
        role: 'Principal Investigator',
        affiliation: 'University of Queensland / Paris Brain Institute',
        url: 'https://parisbraininstitute.org/collaborators/couvy-duchesne-baptiste',
      },
    ],
    institutes: [
      'University of Queensland',
      'Paris Brain Institute (ICM)',
      'Queensland Brain Institute',
    ],
    domains: [
      "Preclinical Alzheimer's",
      'Amyloid & Tau PET',
      'Cognitive Resilience',
      'Multimodal Biomarkers',
    ],
    bannerBadge: 'Australia Consortium',
  },
  {
    id: 'mnd-network',
    name: 'MND Network (Motor Neuron Disease Network)',
    shortName: 'MND Network',
    piName: 'Dr. Sicong Tu & Dr. Thomas Shaw',
    logo: logoMnd,
    tagline: 'Australian Motor Neuron Disease Cohort Infrastructure',
    description:
      'Federated data linkage system standardizing longitudinal motor neuron disease / ALS clinical registries, imaging, and biofluid biobanking across Australian states.',
    category: 'National Network',
    communityType: 'consortium',
    status: 'prospective',
    statusLabel: 'Prospective Community',
    themeColor: '#14b8a6',
    themeAccent: 'from-teal-500 to-emerald-700',
    countryCodes: ['AU'],
    coordinates: {
      lat: -33.8688,
      lng: 151.2093,
      city: 'Sydney / Brisbane',
      country: 'Australia',
    },
    stats: {
      datasetsCount: 6,
      subjectsCount: 1380,
      nodesCount: 4,
    },
    coordinators: [
      {
        name: 'Dr. Sicong Tu',
        role: 'Consortium Co-Chair',
        affiliation: 'University of Sydney',
        url: 'https://profiles.sydney.edu.au/sicong.tu',
      },
      {
        name: 'Dr. Thomas Shaw',
        role: 'Consortium Co-Chair',
        affiliation: 'University of Queensland',
        url: 'https://about.uq.edu.au/experts/30967',
      },
    ],
    institutes: [
      'University of Sydney (Brain and Mind Centre)',
      'University of Queensland',
      'Perron Institute for Neurological and Translational Science',
      'Florey Institute of Neuroscience and Mental Health',
    ],
    domains: [
      'Motor Neuron Disease',
      'ALS Research',
      'Spinal Cord & Brainstem MRI',
      'Australian Registries',
    ],
    bannerBadge: 'Pan-Australia',
  },
  {
    id: 'enigma-tremor',
    name: 'ENIGMA-Tremor Working Group',
    shortName: 'ENIGMA-Tremor',
    piName: 'Dr. Max Laansma',
    logo: logoEnigmaTremor,
    tagline: 'Worldwide Working Group on Essential & Dystonic Tremor',
    description:
      'Multi-site consortium pooling high-resolution MRI and deep phenotyping to investigate the cerebello-thalamo-cortical circuit dysfunctions underlying essential and dystonic tremors.',
    category: 'Disease Consortium',
    communityType: 'consortium',
    status: 'prospective',
    statusLabel: 'Prospective Community',
    themeColor: '#a855f7',
    themeAccent: 'from-purple-500 to-fuchsia-600',
    countryCodes: ['NL'],
    coordinates: {
      lat: 52.3676,
      lng: 4.9041,
      city: 'Amsterdam',
      country: 'Netherlands',
    },
    stats: {
      datasetsCount: 5,
      subjectsCount: 1040,
      nodesCount: 3,
    },
    coordinators: [
      {
        name: 'Dr. Max Laansma',
        role: 'Working Group Chair',
        affiliation: 'Amsterdam UMC',
        url: 'https://pure.amsterdamumc.nl/en/persons/max-laansma/',
      },
    ],
    institutes: [
      'Amsterdam UMC',
      'Krembil Brain Institute / University Health Network',
      'University College London (UCL)',
    ],
    domains: ['Essential Tremor', 'Cerebellar Networks', 'Dystonia', 'High-field MRI'],
    bannerBadge: 'Working Group',
  },
];

export interface NetworkAggregateStats {
  totalSubjects: number;
  totalDatasets: number;
  totalNodes: number;
  totalCommunities: number;
  activePortalsCount: number;
  prospectiveCommunitiesCount: number;
  countriesCount: number;
  institutesCount: number;
}

export function getNetworkAggregateStats(): NetworkAggregateStats {
  const allCountries = new Set<string>();
  const allInstitutes = new Set<string>();
  let totalSubjects = 0;
  let totalDatasets = 0;
  let totalNodes = 0;
  let activePortalsCount = 0;
  let prospectiveCommunitiesCount = 0;

  COMMUNITIES.forEach((c) => {
    totalSubjects += c.stats.subjectsCount;
    totalDatasets += c.stats.datasetsCount;
    totalNodes += c.stats.nodesCount;
    c.countryCodes.forEach((code) => allCountries.add(code));
    c.institutes.forEach((inst) => allInstitutes.add(inst));

    if (c.status === 'active') {
      activePortalsCount += 1;
    } else {
      prospectiveCommunitiesCount += 1;
    }
  });

  return {
    totalSubjects,
    totalDatasets,
    totalNodes,
    totalCommunities: COMMUNITIES.length,
    activePortalsCount,
    prospectiveCommunitiesCount,
    countriesCount: allCountries.size,
    institutesCount: allInstitutes.size,
  };
}

export const COUNTRY_NAMES: Record<string, { name: string; flag: string }> = {
  CA: { name: 'Canada', flag: '🇨🇦' },
  US: { name: 'United States', flag: '🇺🇸' },
  NL: { name: 'Netherlands', flag: '🇳🇱' },
  SE: { name: 'Sweden', flag: '🇸🇪' },
  NO: { name: 'Norway', flag: '🇳🇴' },
  DK: { name: 'Denmark', flag: '🇩🇰' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  FR: { name: 'France', flag: '🇫🇷' },
  CH: { name: 'Switzerland', flag: '🇨🇭' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  IL: { name: 'Israel', flag: '🇮🇱' },
  CL: { name: 'Chile', flag: '🇨🇱' },
  AU: { name: 'Australia', flag: '🇦🇺' },
  AT: { name: 'Austria', flag: '🇦🇹' },
  EU: { name: 'European Union', flag: '🇪🇺' },
  INTL: { name: 'International', flag: '🌐' },
};
