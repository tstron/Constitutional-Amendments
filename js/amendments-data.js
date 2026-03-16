/**
 * Amendment proposals and version history.
 * Add new versions here when new _V2, _V3, etc. proposal files are created.
 * Each version has: id, label, date (optional), and content (array of section objects with title and body).
 */
window.AMENDMENTS_DATA = [
  {
    id: "representative-assembly-apportionment",
    title: "Representative Assembly and Apportionment Amendment",
    slug: "RepresentativeAssemblyAndApportionmentAmmendment",
    versions: [
      {
        id: "v1",
        label: "Version 1",
        date: null,
        content: [
          { title: "Section 1 — Representation", body: "The U.S. House of Representatives is composed of Members elected from districts apportioned among the several States according to their respective populations.\n\nA congressional district containing more than one hundred thousand persons, as determined by the most recent decennial census, is invalid. An election conducted from an invalid district has no legal effect." },
          { title: "Section 2 — Lawful Places of Assembly", body: "Congress may by law designate additional lawful places of assembly for the House of Representatives.\n\nProceedings conducted at any lawful place of assembly possess the same constitutional force and effect as proceedings conducted at the seat of government." },
          { title: "Section 3 — Equality of Legislative Authority", body: "The legislative authority of a Member of the House of Representatives does not depend upon physical presence at any particular place of assembly.\n\nAny rule or practice that assigns unequal voting power based on physical location is void." },
          { title: "Section 4 — Enforcement", body: "This article is self-executing. Any person with standing under Article III may seek judicial relief to enforce its provisions." }
        ]
      }
    ]
  },
  {
    id: "ranked-choice-voting",
    title: "Ranked-Choice Voting Amendment",
    slug: "RankedChoiceVotingAmendment",
    versions: [
      {
        id: "v1",
        label: "Version 1",
        date: null,
        content: [
          { title: "Section 1 — Federal Elections (Flexible Ranked-Choice Voting)", body: "Elections for the offices of President, Vice President, and Members of the House of Representatives and Senate are conducted using a ranked-choice method. Voters may indicate preferences among multiple candidates in order.\n\nThe method of counting must respect each voter's expressed preferences and produce a winner or winners reflecting majority or broad support. Any system that misrepresents voter preferences, manipulates rankings, or allocates votes in a manner that undermines majority support is invalid." },
          { title: "Section 2 — State Elections (Optional Adoption)", body: "A State may conduct elections for any office using the same ranked-choice method.\n\nIf a State adopts this method, votes and procedures must comply with the principles established in Section 1, ensuring that each voter's preferences are fully counted and each candidate's support accurately reflected." },
          { title: "Section 3 — Integrity, State Autonomy, and Legal Consequences", body: "Congress provides by law for transparent reporting, secure tabulation, and independent verification of all votes for elections conducted under this amendment.\n\nElection systems must:\n\nProtect voter intent: all expressed preferences must be accurately recorded, stored, and counted.\n\nPrevent manipulation: no candidate, party, elected official, or federal officer may alter, suppress, seize, or misallocate ballots or rankings.\n\nProtect state administration: each State retains authority to administer elections for offices under this amendment according to its constitution and laws. Federal action may not interfere with lawful state election administration except to ensure compliance with this article.\n\nPreserve chain of custody: all ballots, votes, and records must be handled in a documented, verifiable chain from voter to final tabulation, with secure storage and audit access.\n\nProvide auditability: election results must be verifiable by independent observers and subject to public review.\n\nEnsure continuity: election procedures must include contingency measures to maintain vote integrity during emergencies, disasters, or disruptions.\n\nLegal consequences: intentional violation of any provision of this article, including manipulation, suppression, or seizure of ballots or votes, constitutes a breach of constitutional duty. Congress provides by law for civil and criminal consequences for such violations, including penalties sufficient to deter malicious actors.\n\nRemedial authority: any election conducted under this article that violates these protections is invalid. Persons with standing under Article III may seek judicial relief, and courts are empowered to enforce the invalidation of elections affected by such violations." },
          { title: "Section 4 — Enforcement", body: "This article is self-executing. Any person with standing under Article III may seek judicial relief to enforce its provisions." }
        ]
      }
    ]
  },
  {
    id: "geometric-districting",
    title: "Geometric Districting Amendment",
    slug: "GeometricDistrictingAmendment",
    versions: [
      {
        id: "v1",
        label: "Version 1",
        date: null,
        content: [
          { title: "Section 1 — Equal Population", body: "Members of the House of Representatives are elected from single-member districts composed of contiguous territory and containing, as nearly as practicable, an equal number of inhabitants." },
          { title: "Section 2 — Required Geometric Form", body: "Each congressional district must be a single, contiguous, simply connected geographic area and must satisfy all of the following requirements:\n\nNo Holes\nA district may not wholly surround or enclose any area not included within the district.\n\nMaximum Number of Sides\nA district may not have more than five sides, as defined in Section 3.\n\nExternally Fixed Boundaries\nAny contiguous portion of a district boundary that coincides with:\n\na state boundary,\n\nan international boundary, or\n\na permanent body of water,\ncounts as one side, regardless of curvature or irregularity.\n\nSide Length Ratio\nThe length of the longest side of a district may not exceed three times the length of the shortest side." },
          { title: "Section 3 — Definition of a Side", body: "For purposes of this Article:\n\nA side is a maximal straight boundary segment forming part of the outer boundary of a district.\n\nConsecutive boundary segments are considered part of the same side unless the direction of the boundary changes by more than a minimal angular threshold established by law for geometric measurement.\n\nBoundary segments that do not coincide with an externally fixed boundary and that fail to meet a minimum measurable length established by law are not treated as sides and are merged with adjacent sides for all purposes of this Article." },
          { title: "Section 4 — Contiguity", body: "District territory must be contiguous by land or by permanent infrastructure customarily used for transportation.\n\nTerritory of a State separated solely by water and lying within the territorial jurisdiction of that State may be included within a district notwithstanding the absence of a land connection or permanent infrastructure, provided that such inclusion is reasonably proximate and is not used to evade the geometric requirements of this Article." },
          { title: "Section 5 — Prohibited Justifications", body: "Compliance with this Article may not be reduced, waived, or avoided on the basis of:\n\npolitical affiliation or voting history,\n\nincumbency,\n\npartisan advantage, or\n\nadministrative convenience." },
          { title: "Section 6 — Enforcement Authority", body: "Congress has power to enforce this Article by appropriate legislation, including the establishment of neutral geometric standards necessary to apply the definitions contained herein, provided that such legislation does not alter the substantive requirements of Sections 1 and 2." },
          { title: "Section 7 — Applicability", body: "This Article applies to all congressional districts used in elections held after its ratification." }
        ]
      }
    ]
  }
];
