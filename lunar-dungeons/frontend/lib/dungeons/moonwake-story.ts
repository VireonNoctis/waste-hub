export type MoonwakeInlineRun = { text: string; emphasis?: "strong" | "em" }

export type MoonwakeStoryBlock =
  | { type: "heading"; level: 1 | 2 | 3; runs: MoonwakeInlineRun[] }
  | { type: "paragraph"; runs: MoonwakeInlineRun[] }
  | { type: "quote"; runs: MoonwakeInlineRun[] }
  | { type: "divider" }
  | { type: "list"; ordered: boolean; items: MoonwakeInlineRun[][] }

export interface MoonwakeVolume {
  id: string
  title: string
  subtitle: string
  blocks: MoonwakeStoryBlock[]
}

export const MOONWAKE_STORY_LINE_COUNT = 4972

export const MOONWAKE_VOLUMES: MoonwakeVolume[] = [
  {
    "id": "before-journey",
    "title": "Before the Journey",
    "subtitle": "The Lumen, the five notes, the Quiet, and the Keepers.",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "The Moonwake Testament"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A complete story of the Lumen, the five notes, the Quiet, and the people who learned to share the night.",
            "emphasis": "em"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "A note to the reader"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "This is the canonical long-form story of the Moonwake campaign. It follows the existing route through the Observatory, Mosslight, Ember Hollow, Frostglass Vale, the Astral Archive, the Quiet Beyond, and the hidden Underlight. The story is arranged as five acts, with interludes, character chapters, companion threads, recovered memories, bestiary folios, and three possible endings. The Wayfarer is the player character, but their name, appearance, and private history remain unwritten. The player is not a lost monarch, a chosen heir, or the answer to an ancient prophecy. The Wayfarer matters because they can listen without claiming ownership of what they hear. The story's central question is not who deserves the Lumen. It is whether any one person should be asked to carry it alone."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The first light"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Before there was a Moonwake, there was a sky without names. There were stars, but no one had yet looked up and called them distant. There was water, but no shore had been called home. There was night, but no one had learned to fear its length. The world was not empty. It was unfinished. The first living voices rose from the dark like small lamps. They called to one another across valleys, rivers, and the wide spaces between them. Every call changed the distance it crossed. A voice answered by another voice became more than a sound. It became a promise that the speaker had been heard. The moon appeared when the first promise returned. It was not made from stone. It was made from the shape of a voice remembered. Its light moved over the water in silver paths. People began to measure time by the way those paths changed. They called the first brightening the Opening. They called the darkening the Listening. They called the return of the full moon the Homecoming. The moon did not speak in words. It kept the spaces where words had once been. Those spaces were the earliest form of memory."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Lumen"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Long after the first settlements, a small light was found in a hollow beneath a hill. It shone without flame, heat, or shadow. It did not burn the hand that held it. It brightened when someone told a true story. It dimmed when a story was forced from someone who did not wish to speak. The people called it the Lumen. They learned that it could remember every name spoken within its light. It remembered names differently from ink or stone. It kept the sound, the feeling, and the choice that had accompanied the name. It remembered a child's first word. It remembered the name someone chose after leaving an old life. It remembered a nickname given in kindness. It remembered names that were never spoken aloud. It did not decide which memories were important. It did not rank one life above another. It held what had been freely entrusted to it. The Lumen became a meeting place rather than a throne. People came to it to remember the dead, celebrate the living, and leave blank pages for the future. The first Keepers were not rulers. They were listeners who made certain that no one was required to give more than they wished. The observatory was built around the Lumen so that its light could be studied without being owned. The city that grew there became known as Moonwake. Its silver roofs were designed to reflect moonlight into narrow streets. Its windows were made of pale glass that warmed when a voice passed nearby. Its towers kept no bells for the hours. They rang only when someone asked to be heard."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The five notes"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Lumen's memory was never a single voice. It was a harmony made from five ways of being present. The first note was Return. Return meant that a path could remain open without demanding that anyone walk it. The second note was Hearth. Hearth meant that care could be offered without turning the cared-for into a debt. The third note was Name. Name meant that identity belonged first to the person who carried it. The fourth note was Distance. Distance meant that separate lives could remain connected without becoming the same. The fifth note was Witness. Witness meant that another person's story could be seen without being seized. The notes were not keys, weapons, or ranks. They were principles that helped the Lumen remain a shared light. The five wardens were chosen to guard the practices, not to possess the notes. Each warden was asked to protect a place where its principle could be lived. The Mosslight warden cared for Return. The Ember warden cared for Hearth. The Frostglass warden cared for Name. The Astral warden cared for Distance. Orin, the First Keeper, carried Witness at the heart of Moonwake. The notes lived together in the Lumen. No single note was stronger than the others. When one was neglected, the whole light grew uneven. The city flourished while the notes were practiced freely. It faltered when people began to treat their meaning as a law that could be imposed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The first mistake"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Lumen's gift created a problem that no one had expected. It could remember a life, but it could not decide how that life should be remembered. Some people asked for their stories to be kept forever. Others asked for a memory to be allowed to change. Some wanted their names spoken after death. Others wanted the living to remember them through ordinary acts rather than ceremony. The Keepers agreed that these wishes could not be reduced to one rule. They made a promise: the Lumen would remain open, and every person would decide what to entrust to it. Over time, the observatory grew proud of its archive. The shelves became taller. The catalogues became more precise. The ceremonies became more beautiful. People began to praise the Keepers for remembering everything. The Keepers began to feel that forgetting was a failure. They forgot that the Lumen had never promised to preserve every detail against a person's will. They began to confuse memory with ownership. The first Keeper who questioned this rule was Orin. Orin noticed that the Lumen brightened most strongly when someone was allowed to leave a story unfinished. Orin also noticed that the archive grew dim when the Keepers insisted on completing another person's account. The council called this observation troubling. They asked Orin to prove it. Orin invited the council to sit in silence with a blank page. Nothing happened. The council declared the experiment inconclusive. Orin said that the blank page was the result. The council did not understand. The mistake was small. It was also the beginning of the Quiet."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Quiet"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Quiet did not arrive as a storm. No black cloud crossed the moon. No army came through the gates. No voice announced an enemy. A woman forgot the name of a street she had walked every morning. A child could no longer remember the tune their parent hummed. A bell rang, and no one knew why it had been built. The missing things were not stolen in the ordinary sense. They became difficult to reach. People remembered the shape of what they had lost, but not the way to call it back. The Lumen tried to hold every missing memory at once. Its light grew thin. The Keepers tried to repair it by collecting more stories. Their archive became a net. The net caught the living as well as the lost. People were asked to repeat memories until they became fixed. A name could no longer change. A promise could no longer be revised. A grief could no longer be set down. The more the city tried to prevent forgetting, the less room remained for living. The Quiet gathered in the spaces where people were no longer allowed to choose. It was not evil. It was the weight of every story carried without a listener. It was the pressure of every name treated as property. It was the silence left after a person was told that their own memory belonged to someone else. When the Keepers looked into the Lumen, they saw a dark place where the five notes should have met. They called that darkness the Quiet. They were wrong to think that naming it made it an enemy. They were right to understand that the world was in danger."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The last council of Moonwake"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin called the five wardens to the observatory. They came from five kingdoms with five different fears. The Mosslight warden feared that the roots would forget the shape of the paths. The Ember warden feared that the hearths would go cold. The Frostglass warden feared that the names would vanish beyond recovery. The Astral warden feared that no map would lead anywhere. Orin feared that the Keepers would repeat their mistake and call possession protection. The council argued until the moon passed behind the tallest tower. One warden proposed locking the Lumen inside the observatory. Another proposed burning the archive so that the Quiet would have nothing to find. A third proposed freezing every name until the danger passed. A fourth proposed mapping every possible future and closing the routes that led to loss. Orin listened to every proposal. Then Orin asked who had been invited to choose. The room fell silent. The five wardens understood that the answer was no one. They had been planning for the people. They had not been listening to them. The council opened the observatory doors. The people of Moonwake came inside. Some asked for their names to be remembered. Some asked for their names to be released. Some asked for a place to sit beside those they missed. Some asked for the right to leave without explaining why. The Lumen brightened. For one moment, the five notes returned to harmony. Then the Quiet pressed against the light. The council had no time to repair the whole city. They chose to divide the Lumen so that the notes could survive in different places. They chose five kingdoms because five practices could be kept alive more easily than one great promise. They did not choose a sixth warden. They left the margin unwritten. The margin was not a missing piece. It was room for someone who had not yet arrived."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The wardens' vow"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Mosslight warden carried Return into the oldest garden. The Ember warden carried Hearth into the caldera. The Frostglass warden carried Name beneath the ice. The Astral warden carried Distance into the moving observatories. Orin kept Witness at the heart of the Quiet. The wardens promised not to turn their notes into crowns. They promised to let the people shape the meaning of each note. They promised to change their methods if those methods began to cause harm. They promised to leave the way home visible. They promised that no one would be made to remember against their will. The vow was spoken by all five wardens. The Lumen broke into five lights. Each light travelled toward its kingdom. The observatory dimmed. The city disappeared from the maps. The Quiet spread through the corridors, but it did not swallow the five notes. The wardens remained as guardians. They were not meant to become monsters. Their tragedy began when they forgot that a guardian must be allowed to put down the burden."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Auralis and the lantern"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri was once called Auralis. She was an archivist, a messenger, and a keeper of small ordinary things. She wrote down the names of every street cat that slept beneath the observatory stairs. She remembered which window caught the last sunlight. She knew which bells were rung for celebration and which were rung for help. She kept a lantern beside the archive door. The lantern was not a weapon. It was a sign that someone could approach without being announced. When the Quiet began to gather, Auralis noticed that it followed the archive's locked shelves. She tried to open them. The council refused. Auralis chose to erase her own name from the catalogue. She did not do it because she wished to vanish. She did it because the Quiet had begun using recorded names as paths into people's memories. She left her name in the lantern instead. The lantern could remember it without forcing anyone else to speak it. The act protected the archive. It also cost Auralis the certainty of who she had been. When she woke again, the name Iri felt easier to carry. The lantern remembered the sound of Auralis. It did not tell her what to do with it. That choice remained hers."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Wayfarer's arrival"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A long time passed. The five kingdoms continued, though none remembered the whole vow. The observatory slept beneath dust and pale vines. The lantern waited beside a door that had no handle. Then someone arrived. The Wayfarer woke beneath the broken dome. No prophecy named them. No crown recognised them. No old family crest appeared on their hand. They were simply present. The lantern warmed. A moth landed on its rim. Iri looked at the Wayfarer and felt a familiar ache. She did not know whether she had seen them before. She did not know whether the feeling belonged to her or to the lantern. The Wayfarer asked where they were. Iri answered, \"Somewhere that is trying to remember how to be a home.\" The Wayfarer asked why the lantern had no flame. Iri said, \"Perhaps it has been waiting for someone who will not use it to burn the dark.\" Outside, the moon crossed the broken roof. The first path opened. The journey began."
          }
        ]
      }
    ]
  },
  {
    "id": "act-one",
    "title": "I · The Bell Beneath the Roots",
    "subtitle": "Mosslight Wilds · Return",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "Act I — The Bell Beneath the Roots"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The first note: Return.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The first guardian: The Verdant Colossus.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The movement art awakened: Moon Dash.",
            "emphasis": "strong"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 1 — The observatory wakes"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The broken dome held a small circle of sky. It was enough sky for the moon to be seen. It was not enough sky for the old astronomers to have finished their work. Their brass instruments leaned toward the opening as if they were still waiting for a star. Silver dust lay over every table. A chart had been left open beneath a glass weight. The chart showed a city that no longer appeared on any map. Iri stood beside the chart with her wings folded close. The Wayfarer watched the lantern glow in her hands. Its glass was clear. Its wick was pale. There was no flame inside it. There was a sound like a small room breathing. \"Does it belong to you?\" the Wayfarer asked. Iri looked at the lantern. \"I do not know.\" \"Then why are you holding it?\" \"Because it was waiting.\" The Wayfarer looked toward the doorway. Outside, pale roots had grown across the threshold. They did not block the passage. They had grown around the stone as though holding it open. Iri followed the Wayfarer's gaze. \"Mosslight,\" she said. \"Is it safe?\" \"Safe is a word people use when they have not yet met the forest.\" \"That is not an answer.\" \"No,\" said Iri. \"It is a warning to ask a better question.\" The Wayfarer asked what the forest wanted. Iri said that forests did not want in the way cities wanted. They made room. They closed wounds. They remembered rain. They did not promise that every road would remain easy. A moth landed on the lantern. The glass brightened. For a moment the Wayfarer heard a voice speaking from very far away. It sounded like someone calling a person home. Then the sound became the rustle of leaves. Iri turned the lantern toward the open gate. \"Come,\" she said. \"We should let the road choose whether it recognises us.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The first threshold"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The observatory steps descended beneath a canopy of white leaves. Every leaf held a thin line of silver along its edge. The morning did not arrive in Mosslight. Instead, a green-gold dusk rested between the branches. Small lights moved through the roots. Some were fireflies. Some were lantern-moths. Some were memories too small to have names. The Wayfarer stepped onto the first bridge. A root bent beneath their weight. It did not break. It rose again when they passed. The bridge led to a stone arch. The arch bore five empty circles. Iri touched the smallest circle. \"Someone has tried to scratch the mark away.\" \"Who?\" \"Perhaps someone who believed a mark could be stolen.\" \"Can it?\" \"Not if it was freely given.\" The Wayfarer examined the circles. The first held the outline of a path. The second held a little hearth. The third held a blank nameplate. The fourth held two stars at a measured distance. The fifth held an open eye. The first circle was warm. The others were cold. Iri withdrew her hand. \"Return,\" she whispered. The root beneath the arch moved. A passage opened through the leaves. The journey entered the forest."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 2 — Bell Garden"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The garden that listened"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Bell Garden was not a garden planted by one hand. It was a hundred years of small decisions growing together. A family had left a window open. A traveller had scattered seeds. A child had buried a broken bell to keep it from being thrown away. An old tree had leaned toward the sound. The roots had built the rest. Flowers shaped like little bells hung from the branches. They rang only when the wind carried a remembered name. Some flowers rang clearly. Some gave only a small tremor. One flower did not ring at all. The Wayfarer stopped beneath it. Iri looked up. \"That one has lost its voice.\" \"Can it be repaired?\" \"Perhaps.\" The Wayfarer reached toward the flower. Iri caught their wrist. \"Do not ask it to speak.\" \"Why?\" \"Because it may not wish to.\" The Wayfarer lowered their hand. The flower opened. A moth slipped out. Its wings were nearly transparent. It circled the lantern and disappeared into the leaves. A path of pale petals appeared on the ground. It led to a stone bench. The bench bore two shallow places where someone had once sat. Beside it lay a child's wooden whistle. The whistle was cracked. The Wayfarer picked it up. A note sounded without breath. The note was not a melody. It was the shape of a question. Iri closed her eyes. \"I know this,\" she said. \"What is it?\" \"A warning.\" \"From whom?\" \"I cannot remember.\" She placed the whistle beside the bench. The note faded. The roots shifted. A small creature emerged from the soil. It had a moss-covered back and a face like a seed. It circled the Wayfarer twice. Then it sprang toward the lantern. The Wayfarer stepped aside. The creature landed on a patch of soft earth. It stared at them. It did not look hungry. It looked startled. Iri crouched. \"Hello, little one.\" The creature lowered its head. A pale line appeared along its back. It was the mark of the Bell Garden. \"Do not strike first,\" Iri said. \"How will I know if it is dangerous?\" \"Watch what it protects.\" The creature moved between them and the buried bell. The bell was hidden beneath a wall of roots. The mossling had not been attacking the Wayfarer. It had been asking them to stay away. The Wayfarer stepped back. The creature relaxed. Iri smiled faintly. \"That is the first thing Mosslight teaches.\" \"What?\" \"Not every obstacle is an enemy.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The bell-keeper's little promise"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "An old gardener sat beneath the largest tree. His name was Pell. He had forgotten the name of the person who taught him to prune the bell flowers. He remembered the hands. He remembered the patience. He remembered that the lesson had happened on a rainy afternoon. He kept a small notebook tied to his wrist. Every page contained a drawing of the same tree. The drawings changed. One showed a young sapling. One showed a tree bending beneath snow. One showed a hollow where a bird had nested. One showed the roots extending beneath the town. Pell did not write the missing name. He had promised not to write it until the person chose to return. \"Do you know who I am?\" Pell asked. Iri shook her head. \"Not by name.\" \"Good.\" The Wayfarer looked at the notebook. \"Why is that good?\" \"Because if you knew my name, you might think you knew my story.\" Pell closed the book. \"Names are useful.\" \"They are not the whole of anyone.\" He pointed toward the buried bell. \"That bell is not a door.\" \"What is it?\" \"A sentence someone could not finish.\" The Wayfarer asked who buried it. Pell looked at Iri. Iri looked at the roots. \"Someone who wanted the warning to survive,\" Pell said. \"The forest has been keeping it for a long time.\" \"Can we hear it?\" \"Only if you do not ring it for your own sake.\" The Wayfarer asked how they could ring it without wanting to hear it. Pell smiled. \"You can listen for the sake of the people who could not finish speaking.\" He opened the notebook again. On the last page was a small drawing of the lantern. Beneath it was a blank space. Pell turned the page before the Wayfarer could ask. The garden continued to listen."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Iri's first thread"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer found Iri beside a shallow pool. The water reflected the lantern but not the faces above it. Iri held one hand under the surface. A tiny moth rested on her finger. \"Do you come here often?\" the Wayfarer asked. \"I used to.\" \"Before what?\" \"Before I learned to forget the beginning of a sentence.\" The Wayfarer sat beside her. The pool remained still. Iri said that she had been an archivist in Moonwake. She had recorded the names of streets, animals, ceremonies, and every person who asked to be remembered. She had believed that careful records could protect people. She had believed that the more she wrote, the less anyone would be lost. Then she had discovered that a name could become a lock. Someone could read a record and decide that the person inside it was no longer allowed to change. Someone could point to an old promise and demand that it be kept forever. Someone could use a memory as proof that a person belonged to them. Iri looked at the lantern. \"I wanted to protect the archive.\" \"What did you do?\" \"I removed my own name.\" \"Why?\" \"Because the Quiet had begun to follow names through the shelves.\" \"Did it work?\" \"For a while.\" \"What happened to you?\" \"I became someone who could carry a lantern but could not remember why she had chosen it.\" The Wayfarer listened. They did not ask Iri to prove the story. They did not ask whether she regretted it. They let the pool hold the silence. After a while, Iri said, \"Thank you.\" \"For what?\" \"For not trying to finish my sentence.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quest — The Bell Kept Quiet"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Bell Garden's warning had been divided into three fragments. One rested beneath the old bench. One was held in a flower that never rang. One lay in the roots around the buried bell. The first fragment sounded like rain against a roof. The second sounded like a voice calling from another room. The third sounded like a hand resting on a door. The Wayfarer gathered the fragments without forcing the flower to ring. They carried them to the root wall. Pell waited there. Iri stood beside him. The Wayfarer offered the fragments. Pell did not take them. \"Let the roots finish their warning,\" he said. The Wayfarer placed the fragments in the earth. The roots drew them together. The buried bell answered once. The sound travelled through every leaf. No creature fled. No branch broke. The mossling lowered its head. The flower that had lost its voice trembled. The warning became words. \"Do not make a monument of what must remain alive.\" Pell closed his notebook. He had heard the sentence before. He had never heard it completed. He began to cry, but not from sadness alone. The missing name did not return. Instead, he remembered the lesson. He remembered the person who had taught it. He remembered that the person had asked to be remembered as someone who had changed. Pell did not say the name. He left the page blank. The roots accepted the fragments. The Wayfarer received the first mark of Return. The mark was not a key. It was a small invitation to keep a path open. Iri looked at the lantern. Its glass brightened. A line of green light crossed the wick. \"One note,\" she said. \"One place that remembers how to welcome.\" The Wayfarer looked toward the deeper forest. The path was still there. It had not been made easier. It had been made possible."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 3 — The Root Archive"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The library that grew"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Root Archive stood inside a hollow tree. Its shelves were living branches. Its books were leaves folded into quiet shapes. Its catalogues were written in rings of wood. The oldest records had no titles. They had small knots where a person had once touched the bark. A thorn sprite hovered near the entrance. It flashed once. Then it dove toward the lantern. The Wayfarer moved aside. The sprite returned to its branch. It flashed again. Iri watched carefully. \"It is guarding the upper shelves.\" \"From us?\" \"From anyone who would take without asking.\" The Wayfarer left the lantern on the stone floor. The sprite settled. A shelf unfolded. Inside lay a book made from pale bark. Its pages were blank. The Wayfarer opened it. A picture appeared. It showed two people carrying a table through rain. One person was laughing. The other was trying not to drop a bowl. The picture faded. A second appeared. It showed the same table beside a window. There were three cups. A fourth place had been left empty. The Wayfarer asked Iri why the book showed no names. \"Because its owners did not ask for them to be recorded.\" \"Then how can it remember?\" \"By remembering what they chose to leave.\" The Wayfarer closed the book. The shelf folded around it. A soft green light ran through the branch. The archive had recognised a respectful guest."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The thorn sprite's lesson"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The thorn sprite was not a monster. It was a question that had grown wings. It flashed whenever someone approached the shelves too quickly. It dove only when a hand reached for a book without permission. Its thorns were tiny and pale. They had never been used to kill. They had been used to keep pages from being torn. The Wayfarer followed it along a narrow branch. The sprite stopped above a gap. Below the gap was a room full of fallen leaves. Each leaf carried one sentence. Some sentences were complete. Some ended halfway through. One said, \"I wanted to tell you...\" Another said, \"The door is still...\" Another said, \"I forgive...\" The Wayfarer reached for the incomplete leaf. Iri shook her head. \"Let it be.\" \"What if someone needs to finish it?\" \"Then the person who owns the sentence may return.\" The Wayfarer let the leaf remain. The sprite circled them once. It landed on the lantern. For the first time, its light did not flash. It glowed softly. A hidden stair opened in the tree. The Wayfarer descended. At the bottom was a reliquary. Inside rested the first secret mark."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Secret — The Mosslight Reliquary"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The reliquary held a seed of glass. It was clear on one side and green on the other. When the Wayfarer touched it, a memory appeared. Auralis stood in the observatory garden. She was younger. Her wings were bright. She was planting a seed beside the door. A voice asked what it would become. Auralis answered, \"A path.\" The voice asked whether paths grew from seeds. Auralis said, \"Only when someone walks beside them.\" The memory changed. The seed was buried beneath the roots. Auralis placed the lantern beside it. She spoke a name. The sound was too faint to understand. Then she said, \"Do not let the door become a wall.\" The memory ended. The Wayfarer kept the fragment. It was the first of five hidden marks. The fragment did not unlock the Underlight by itself. It changed the lantern's reflection. A faint silver line appeared around the glass."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The root archive's final room"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "At the deepest shelf, the Wayfarer found a book with no spine. It was tied with a thread of living green. Iri refused to touch it. The Wayfarer asked why. \"Because I remember opening it.\" \"What happened?\" \"I do not know.\" \"Then we can open it together.\" Iri stared at the book. The lantern warmed between them. She did not move. The Wayfarer waited. The archive creaked. A branch lowered itself like a hand. Iri finally touched the thread. The book opened. A page showed a drawing of Moonwake before it disappeared. The observatory stood bright beneath a full moon. The streets were full of people. The archive doors were open. Auralis stood in the doorway with the lantern. She was smiling. Iri drew a breath. \"That is me.\" The Wayfarer nodded. \"Yes.\" \"I thought I had been a stranger to this place.\" \"You were not.\" \"I cannot remember being happy.\" \"You do not have to remember everything at once.\" The page turned by itself. The next page was blank. Iri closed the book. She did not ask the archive to fill it. The root accepted the silence. The lantern glowed more strongly. A new passage appeared toward Briar Well."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 4 — Briar Well"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The colossus beneath the garden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Briar Well was a circular chamber beneath the oldest roots. Its walls were made from twisted wood and pale stone. The floor was covered in soft moss. At the centre stood a great figure. It was built from branches, roots, and a broken bell. Its shoulders held small trees. Its hands rested on the ground. Its face had no mouth. A line of green light crossed its chest. The Verdant Colossus was awake. The Wayfarer approached. The Colossus raised one hand. Roots moved across the floor. They formed a wide ring. The Wayfarer stopped. Iri placed the lantern on the ground. The Colossus lowered its hand. For a moment, the chamber was quiet. Then the Colossus pointed to the wall. A mural showed the five wardens. Each carried a note of light. Orin stood at the centre. Auralis stood beside them. The mural had been damaged. Someone had scratched away the face of the Keeper. The Colossus touched the scratch. A leaf grew over it. The Wayfarer understood. The guardian was not defending a throne. It was defending the last record of a promise. A bell sounded beneath the floor. The Colossus stepped forward. Its arms rose. Roots began to move. The fight began."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The shape of the encounter"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Colossus did not attack at random. It raised both arms before the roots crossed the floor. The moss beneath the Wayfarer brightened where the roots would emerge. The safe places were small but clear. The Colossus paused after each sweep. The pause was not weakness. It was an invitation to move. The Wayfarer learned to wait for the ground to speak. They learned to move without rushing. They used the lantern strike only when the Colossus lowered its guard. The first strike broke a branch. The second revealed a bell-shaped knot. The third made the green light flicker. The Colossus stepped back. A new pattern appeared. Roots rose from the walls. The floor became a living bridge. The Wayfarer jumped across. The Colossus struck the ground. The bridge shook. The Wayfarer held the lantern close. Its light drew a path through the moving roots. The guardian's chest opened. Inside was a small note of green light. The Wayfarer did not seize it. They waited. The Colossus lowered its hands. The light moved toward the lantern by itself. The battle ended. No trophy fell. No crown appeared. The Colossus knelt. The roots around the chamber relaxed. Its face changed. A small mouth appeared. It spoke in a voice like rain. \"Return is not the act of bringing someone back.\" \"It is the act of leaving a way for them to choose.\" The Wayfarer lowered the lantern. The first note entered the glass. The chamber filled with leaves. The Colossus became still. It had not died. It had finished guarding the warning. The mossling returned to the chamber. It rested against the Colossus's hand. The guardian closed its fingers gently around the creature. A new mark appeared on the Wayfarer's palm. It was a curve shaped like a path. The moon dash awakened. The ability was not a gift of speed alone. It was the power to cross a short distance without losing the direction of home."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The first movement art"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer stood at the chamber's edge. A wide crack divided the floor. The new mark warmed. They took a breath. Then they moved. For one brief instant, the world became a line of green light. The gap passed beneath their feet. They landed on the far side. Iri laughed. It was a small sound. She had not laughed in a long time. The Wayfarer looked back. The Colossus had returned to its kneeling place. The mossling slept beside it. A root curled around the lantern. The chamber had become a garden again. Iri said, \"The first art is called Moon Dash.\" \"Did you know it would happen?\" \"No.\" \"Then why are you smiling?\" \"Because it happened without anyone taking it from you.\" The Wayfarer looked at the new mark. It shone faintly. The path beyond Briar Well opened. A red light flickered on the horizon. The next kingdom waited inside a caldera. Iri looked toward it. \"Ember Hollow.\" \"What should we expect?\" \"Warmth.\" \"That sounds better than a warning.\" \"It is.\" She paused. \"Warmth can also be a burden when a city forgets how to rest.\" The Wayfarer picked up the lantern. The first act ended. The forest did not close behind them. It kept the way home open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 5 — After the bell"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Pell's final page"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Before leaving Mosslight, the Wayfarer returned to Pell. The old gardener was sitting beneath the bell flowers. His notebook rested on his knees. The page that had once been blank now held a small drawing. It showed two hands planting a seed. Neither hand had a name. Pell smiled at the drawing. \"I remember the lesson now.\" \"Do you remember who taught it?\" \"I remember what they asked me to remember.\" \"Is that enough?\" \"It is enough for today.\" Pell tore no page from the book. He added a new leaf to the cover. It had been pressed between two pieces of bark. The leaf held a faint green note. Pell gave it to the Wayfarer. \"Take this to the next kingdom.\" \"What is it?\" \"A reminder that a hearth can be shared by strangers.\" The Wayfarer thanked him. Pell looked toward the forest gate. \"Tell Vey that the roots still remember his promise.\" Iri nodded. \"I will.\" Pell closed the notebook. The old name remained unwritten. The path remained open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Iri's second truth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "At the edge of the forest, Iri stopped. The lantern cast two shadows. One belonged to her. The other belonged to someone she could almost remember. \"I think I know why I erased my name,\" she said. The Wayfarer waited. \"I believed that if the Quiet could not find me, it could not follow the others.\" \"Did it work?\" \"It kept the archive safe for a time.\" \"Did you choose it?\" \"Yes.\" \"Would you choose it again?\" Iri watched a moth pass through the light. \"I do not know.\" The Wayfarer did not tell her what she should have done. They asked what she wanted now. \"I want to learn the name without being made to wear it.\" \"Then we can leave it until you are ready.\" Iri smiled. \"That is a better promise.\" The lantern brightened. The second shadow faded. The Wayfarer and Iri stepped onto the road to Ember Hollow."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Interlude — The old bell's dream"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "That night, the buried bell dreamed. It dreamed of Moonwake before the Quiet. It dreamed of a festival where the people brought unfinished stories. A child spoke of a bird that had not yet learned to fly. A baker spoke of a loaf that had collapsed and become better as a pudding. A tired guard spoke of a road they no longer wished to patrol. Auralis wrote none of these stories down. She listened. When the festival ended, the Lumen glowed like a small sunrise. The bell asked the moon why. The moon answered, \"Because no one was asked to finish.\" The bell asked what would happen when the stories were forgotten. The moon said, \"They will change.\" The bell asked whether change was loss. The moon said, \"Sometimes.\" Then it added, \"Sometimes it is how a story survives.\" The bell woke beneath the roots. It no longer feared the sound of silence. It had learned the difference between a pause and an ending."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The Mosslight Chronicle — Recovered pages"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Rootbound Gate"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The gate was built for people who travelled slowly. It had no lock. Its hinges were made of living wood. The first Keeper placed a small stone beneath it. The stone was not a foundation. It was a promise that the gate could be held open by anyone who wished to welcome another. The Wayfarer's footsteps made the stone glow. The gate recognised a guest. It did not demand a name."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Fernfall Crossing"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Fernfall was a bridge made from overlapping leaves. It bent toward the river. It rose when the rain was heavy. Travellers once tied ribbons to its branches. Each ribbon marked a journey that had been completed. The oldest ribbon had no colour. It had been worn smooth by many hands. It marked a journey someone had chosen not to describe. The forest kept it anyway."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Sunken Grove"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Sunken Grove lay below a shallow lake. The trees grew downward from the surface. Their roots made a ceiling of green. A person could walk beneath the water without becoming wet. The grove remembered the sound of rain from before the first bell. Some visitors heard their own footsteps. Others heard the footsteps of people they had never met. The grove did not explain the difference."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Mosskeeper Halls"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The halls were grown around the trunks of seven trees. Each tree held a different kind of memory. One held celebrations. One held ordinary chores. One held names freely given. One held names deliberately released. One held promises. One held apologies. The last held blank pages. The Mosskeepers said that the blank tree was the most important. It gave the others room to grow."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Thornwake Tunnels"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The tunnels were narrow. The roots pressed close to the stone. Lantern-moths lived in the cracks. They made their nests from pieces of old maps. The maps showed roads that had never existed. A traveller who followed one would always reach a place where someone needed help. The Mosskeepers did not consider this a useful map. The moths considered it perfect."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Buried Orchard"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The orchard held trees that bore no fruit. Instead, each branch carried a small brass tag. The tags listed things people had once asked to remember. A first snowfall. A warm cup. A letter never sent. A dog waiting at a gate. The orchard was not a monument to the past. It was a place where the living could leave small things without being asked to explain them."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Wyrmroot Warrens"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The warrens were made by an ancient root-creature. It moved slowly beneath the soil. It could hear every footstep above it. It never emerged when people were afraid. It surfaced only when a traveller sat down and waited. The creature's back was covered in moss. Small flowers grew between its scales. The Mosskeepers called it the patient road."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Hollow Stump"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The stump was the remnant of a tree that had sheltered the first refugees from the Quiet. Its hollow was large enough for a whole family. The inside was lined with soft bark. A child's height marks remained on the wall. The marks had not been updated for centuries. They were left in place because the child had asked not to be measured again."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Briarwatch Depths"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The depths were built around a well of living roots. The roots carried warnings from one part of the forest to another. They did not carry private memories. They carried requests for help. A traveller could place a hand on the wall and feel the direction of a distant need. The Wayfarer felt the Colossus waiting. The forest had been trying to say so for many years."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Lanternfen"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Lanternfen was a low meadow filled with silver mist. The water reflected stars that were not visible in the sky. Each lantern-moth carried a tiny piece of the first note. They gathered around people who had lost their way. They never led anyone by force. They moved toward the place where a path had been left open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Verdant Maze"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The maze rearranged itself whenever someone insisted on finding the quickest route. It opened when a traveller admitted they were lost. Its walls were made of roots with soft green light in their veins. A person could hear companions through the walls. The voices were not always nearby. The maze taught that distance was not the same as abandonment."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Oldgrowth Catacombs"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The catacombs held the roots of trees that had died naturally. Their names were not written. Their rings recorded seasons, storms, and the pressure of other roots. The Mosskeepers visited to thank them. Nothing was buried there against its will. The dead trees had made their own room for rest."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Spore Cathedral"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The cathedral was not built for worship. It was built to hold the echo of the first bell. The spores glowed when someone spoke a memory with care. They grew brighter when someone admitted that they did not know. The cathedral had no altar. It had a circle of seats. Every seat was the same height."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Heartwood Descent"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The descent led toward Briar Well. The roots grew thicker. The floor became warmer. A bell-shaped shadow moved below the stone. The Wayfarer could hear the Colossus breathing. It was not sleeping. It was waiting for the warning to be heard."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Warden's Ring"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ring was the chamber where the Verdant Colossus stood. It was shaped from the roots of the first tree. A green note rested in the guardian's chest. The note could not be taken. It had to be invited. When the Wayfarer listened, the Colossus lowered its hands. The first note returned to the lantern. The gate to Ember Hollow opened."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Ancient Canopy"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The canopy was visible from every path in Mosslight. Its highest branches held a fragment of the moon's reflection. The leaves moved even when there was no wind. The Mosskeepers said the canopy was listening to the next kingdom. It knew the fire would need a place to rest. It knew the ice would need a voice. It knew the stars would need room. It knew the Quiet would need to be heard."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Dialogue folio — Pell, Iri, and the garden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"The tree does not remember every hand that touched it.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then how does it remember?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"By growing where those hands made room.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"I used to think an archive had to be complete.\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"A complete archive is a room with no door.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"What should we keep?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"What someone chooses to leave.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"And what should we release?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"What someone asks us to stop carrying.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if we do not know which is which?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then listen before you reach.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"I wish I had heard that sooner.\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"You heard it when you were ready.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Does the forest forgive the Keepers?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"The forest does not keep accounts.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then who does?\" "
          },
          {
            "text": "Pell:",
            "emphasis": "strong"
          },
          {
            "text": " \"People, sometimes. That is why they need gardens.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Character page — The Verdant Colossus"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Colossus was once called the Root Listener. It was not born as a warrior. It was a guardian grown from a tree that had survived three seasons of forgetting. The wardens asked it to hold the first note. It agreed because the forest had already been keeping the paths open. When the Quiet reached Mosslight, the Root Listener tried to preserve every warning. It bound the bell into its chest. The bell's sound became part of its body. The guardian grew larger as the warning became heavier. It learned to mistake stillness for safety. It did not know that a warning must eventually be heard. Its roots crossed the paths. Its branches covered the doors. The forest began to treat it as a wall. The Colossus did not understand that it had become the obstacle. When the Wayfarer approached, it tested whether they would strike first. The Wayfarer listened. The Colossus allowed the note to return. Afterward it remained in Briar Well. The mossling continued to sleep beside it. The guardian's work changed from holding the warning to tending the garden that had grown around it. It never became small. It became gentle."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Colossus speaks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "\"I was given a sound.\" \"I was told that the sound must survive.\" \"I wrapped it in roots.\" \"I wrapped it in branches.\" \"I wrapped it in years.\" \"I thought the warning would be safer if no one could reach it.\" \"Then the garden grew around my silence.\" \"I did not hear the flowers.\" \"I did not hear the mossling.\" \"I did not hear the travellers.\" \"I heard only the bell.\" \"You came without a hammer.\" \"You came without a crown.\" \"You came with a lantern that did not burn.\" \"You did not ask me to surrender.\" \"You asked the room to remember.\" \"Take the note.\" \"Leave the path.\" \"Let the warning become a way home.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Ending beat of Act I"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer crossed the final bridge at dusk. The forest opened behind them. The bell flowers rang once. Pell stood beneath the canopy. The mossling lifted its head. The thorn sprite circled the gate. Iri looked back at the observatory. She could see only a line of pale light. The lantern held the first note. It did not shine brighter than before. It shone more evenly. The Wayfarer asked whether the other notes would be found. Iri answered that the notes were not lost. They were waiting where people still practiced their meanings. The road turned toward a red horizon. A warm wind reached them. It smelled of ash, bread, and rain on stone. Iri smiled. \"Ember Hollow,\" she said. The Wayfarer asked whether the next guardian would be a monster. Iri answered, \"It may look like one.\" \"Will it be one?\" \"That depends on whether we remember to listen.\""
          }
        ]
      }
    ]
  },
  {
    "id": "act-two",
    "title": "II · The Hearth That Kept the Dark",
    "subtitle": "Ember Hollow · Hearth",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "Act II — The Hearth That Kept the Dark"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The second note: Hearth.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The second guardian: The Ember Sovereign.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The movement art awakened: Wall-Jump.",
            "emphasis": "strong"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 1 — A city inside a cooled star"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road from Mosslight did not end at a gate. It descended through black stone and opened into a wide caldera. Ember Hollow lay inside the old heart of a mountain. Its roofs were dark glass. Its windows glowed like small amber moons. Thin bridges crossed the empty places between towers. Below them, rivers of cooled slag held the memory of fire. There was warmth in the air, but no smoke. The city had learned to keep its furnaces low. Its people called that practice the Quiet Flame. They did not mean the Quiet that gathered around forgotten names. They meant a hearth that could warm a room without consuming it. At every street corner stood a public fire. Some fires were barely larger than candles. Some warmed whole courtyards. Each had a ring of stones around it. The stones were marked by the names of people who had tended them. No stone was larger than another. A person could add a mark. A person could also ask for a mark to be removed. The Wayfarer watched a child place a small piece of charcoal beside a fire. The child did not write a name. They drew a circle. The circle was open at one side. Iri recognised it. \"That is a place kept free.\" \"For whom?\" \"For whoever needs it.\" The Wayfarer looked at the many open circles around the city. Some were old. Some were new. One held a little brass cup. Another held a scarf. A third held nothing. A warm wind passed through the street. The empty circle flickered. It did not close. Ember Hollow had made a custom of leaving room. It had also forgotten why the custom mattered. The furnaces were growing brighter. The public fires were beginning to dim. The city needed someone to remember the difference between warmth and burning."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 2 — Cinder Market"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The market of small offerings"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Cinder Market was crowded with ordinary wonders. A seller offered glass beads filled with captured dawn. A baker sold bread shaped like little moons. A tailor repaired coats with thread spun from ash. A potter made cups that warmed only when held by two people. No one sold memories. The city had once tried. It had stopped when a memory was mistaken for something that could be owned. The market had kept one stall empty since that day. A sign above it read: \"For the guest who has not arrived.\" Vey stood behind the stall beside a small hearth. He wore a coat marked by pale burn scars. His hands were blackened with soot. He was polishing a cup that had never been used. The Wayfarer approached. Vey looked at the lantern. \"That is a long road to carry a little light.\" \"It does not burn.\" \"Then perhaps it is the safer sort.\" Iri stepped forward. \"Vey.\" He looked at her for a long time. \"I know the shape of your voice.\" \"Do you remember my name?\" \"No.\" \"That is all right.\" Vey placed the cup on the table. \"I kept a place for a name I could not pronounce.\" The Wayfarer asked who it belonged to. Vey shook his head. \"That is the promise.\" He tapped the empty stall. \"I was asked not to decide who would come.\" \"Who asked you?\" \"I do not know.\" \"Then why keep the promise?\" Vey smiled. \"Because I remember making it freely.\" The Wayfarer looked at the hearth. Its flame was small. It was warm enough for three people. Vey offered them bread. Iri accepted. The Wayfarer accepted. Vey sat down. For a moment, the three of them were simply people sharing food. The lantern glowed. The city seemed to breathe more easily. Then a furnace bell rang. The market windows turned orange. Vey stood at once. \"Something has taken the heat.\" He looked toward the Last Hearth. \"It is happening again.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Ash-smith's trade"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Vey was the last ash-smith. He did not forge weapons for the city. He repaired the tools that kept its public fires safe. He made shutters for furnaces. He made iron rings for hearth stones. He made small bells that could be heard without frightening anyone. His greatest work was the Quiet Flame. It was a method of heating rooms without feeding the furnace more than it needed. The method depended on sharing. A person tended the fire for a short time. Another person took their place. A third person checked that the room was not too warm. No one stayed until they were exhausted. The old city had called this inefficient. The people of Ember Hollow had kept it anyway. Vey told the Wayfarer that his teacher had taught him the method. The teacher's face was gone from his memory. The teacher's hands remained. They had been broad. They had carried a small burn across one thumb. They had always warmed the tools before passing them to someone else. Vey remembered one sentence. \"Never make the next person touch what you could have made gentle.\" The Wayfarer asked whether he had written it down. Vey shook his head. \"I did not want the sentence to become a rule.\" \"Why not?\" \"Because the teacher said it to me.\" \"He did not ask you to preserve it?\" \"He asked me to use it.\" Vey placed a warm cup in the Wayfarer's hands. The cup did not burn. It was made for the next person. Vey's promise was like that. It was not a monument. It was a practice."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quest — A Hearth for Two"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Vey's small hearth had two places beside it. One was used every evening. The other remained open. The city had asked him to close the empty place. They believed it was wasteful to keep a seat for someone who might never arrive. Vey refused. He did not know whether the guest would be a person, a family, or a stranger who needed a night of warmth. He only remembered the request. The Wayfarer listened to the story. Iri looked at the empty place. She asked whether Vey wanted to keep it forever. Vey said that he wanted the promise to remain kind. A promise could become cruel when it refused to change. He asked the Wayfarer to choose what should happen. \"Keep the hearth for the unknown guest,\" Vey said. \"Or give the ember back to the city.\" The Wayfarer could not choose for Vey. They asked what he wanted. Vey looked at the flame. \"I want the city to understand that a place is not wasted because it is open.\" The Wayfarer chose to keep the hearth open. Vey did not thank them. He invited them to sit. The three ate together. The empty place remained. Later, Vey placed a small amber chip in the lantern's path. It held the second hidden memory. The open seat had never belonged to one forgotten guest. It had been reserved for the next person who arrived without a name. Vey's promise was made to the world, not to a single face. The Wayfarer understood that the promise could survive without knowing who would need it. The second companion thread was remembered. The public fire grew steady."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 3 — Slag Bridge"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The bridge above sleeping fire"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Slag Bridge crossed the deepest part of the caldera. It was held by chains and old stone. The bridge moved slightly when the mountain breathed. Below it, red light glowed through cracks. The city called the light sleeping fire. It was not safe to fall. It was also not safe to rush. A small ash hound patrolled the bridge. It left a trail of warm cinders. It lowered its head before each lunge. The Wayfarer watched the pattern. The hound's eyes were pale. Its paws did not leave marks. It was not hunting for food. It was guarding a broken chain. The chain had once held the bridge in place. A traveller had tried to force the bridge open years ago. The hound had remained beside the damage ever since. The Wayfarer moved carefully. The hound lunged. The Wayfarer stepped aside. The hound stopped. It looked at the broken chain. Iri knelt beside it. \"You have been here a long time.\" The hound's ears lowered. The Wayfarer used the lantern to warm the chain. The metal brightened. The hound moved away. The bridge settled into place. The hound lay down. It had not needed to be defeated. It had needed the bridge to be safe again. The Wayfarer left it a piece of bread. The hound did not eat immediately. It waited until they had crossed. Then it carried the bread beneath the bridge. The city did not count the act as a victory. The hound did not count it as a defeat. The bridge remained open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The glass kiln"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The hidden kiln lay beneath a broken arch. Its door was covered in black glass. The Wayfarer found it by following the amber chip. The lantern's reflection made a second door appear. Inside, the kiln was cold. A row of small chairs stood beside the furnace. Each chair had a cup. The cups were empty. The chairs were different sizes. One was made for a child. One was made for someone with a cane. One was made for a person who preferred to sit near the door. The fourth was a simple stool. A sign read: \"No guest must explain their arrival.\" The Wayfarer touched the stool. A memory opened. Vey stood beside a younger Orin. Orin was tired. Their name had already begun to fade. Vey offered a cup. Orin declined. Vey did not insist. He simply left the cup within reach. Orin returned later. The cup was still warm. Auralis stood in the doorway. She did not record the moment. She watched it. The memory ended with a chair being placed beside the hearth. The second secret mark appeared. It was not a key to a treasure. It was proof that the promise had been made before the Quiet reached the city. The Wayfarer carried it away. The kiln remained cold. It had completed its work."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The bridge's small history"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The bridge had been built by three crews. The first crew laid the stone. The second crew made the chains. The third crew repaired the damage after the mountain shook. Each crew disagreed with the others. The first wanted the bridge to be permanent. The second wanted it to be easy to repair. The third wanted it to be safe even when it was broken. The final design carried all three ideas. The bridge could move. The bridge could be repaired. The bridge could be closed without collapsing. A plaque listed the crews. Beside the names was a blank space. The Wayfarer asked why. A nearby worker explained that the blank was for people who would maintain the bridge in the future. The worker had never met those people. They had still built a place for them. The Wayfarer understood another meaning of Hearth. It was not only warmth. It was the work that made warmth possible tomorrow. A public fire required someone to tend it. A bridge required someone to inspect it. A promise required someone to notice when it became too heavy. The city had survived because people continued to do ordinary work. The Quiet had not erased that work. It had made it difficult to remember who was sharing it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 4 — The Last Hearth"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The furnace that would not rest"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Last Hearth stood in the deepest chamber of Ember Hollow. It was a public furnace built around a pale ember. The Ember Sovereign stood before it. Its body was shaped from black iron and warm glass. Its crown was a ring of small chimneys. Light moved through its chest. The Wayfarer saw that the light was not flame. It was memory. The Sovereign had been feeding the furnace with its own past. It had given away its childhood. It had given away the name of its first friend. It had given away the sound of a door opening. It had given away the reason it had become a guardian. Each memory had warmed one district. The city had mistaken the brightness for strength. The Sovereign had mistaken exhaustion for duty. The Wayfarer approached. The Sovereign raised three ember marks. They appeared on the floor. The first marked a safe place. The second marked a place that would soon become dangerous. The third marked the path of a wide sweep. The Wayfarer learned the pattern. They waited. They moved. They struck only when the Sovereign lowered its guard. The first blow made the chimneys ring. The second showed a small chair inside its chest. The third made the furnace dim. The Sovereign awakened. Its crown burned brighter. The room filled with heat. The Wayfarer used the first note of Return. The green light crossed the floor. The Sovereign paused. It recognised the sound of an open path. The battle continued. The Wayfarer did not try to destroy the furnace. They tried to show the Sovereign that the fire could be shared. The Sovereign lowered its arms. The light inside its chest became small. It spoke. \"I have kept the hearth burning.\" \"Who asked you to?\" \"I cannot remember.\" \"Then why have you kept going?\" \"Because the people were cold.\" \"Are they still cold?\" The Sovereign looked toward the city. The public fires were dim. The workers were waiting. The Wayfarer asked whether the city could help. The Sovereign did not answer. It had forgotten how to ask."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The second note"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri placed the lantern beside the furnace. Vey entered the chamber carrying a small iron ring. He had made it for the Quiet Flame. It could divide heat across several hearths. The Sovereign watched him. Vey did not bow. He placed the ring around the pale ember. The ring warmed. The furnace's light moved into the public channels. It did not grow brighter. It became more even. The city lights steadied. The Sovereign lowered its crown. A voice came from the furnace. It was the sound of an old promise. The second note returned. Hearth. The note entered the lantern. The Sovereign's body cooled. Its face became less severe. It remembered its name had once been spoken by a friend. It did not remember the name itself. It did not need to. It remembered the laughter that followed it. Vey sat beside the Sovereign. The two watched the fire. The Sovereign said, \"I have nothing left to give.\" Vey answered, \"Then take your turn resting.\" The Sovereign asked who would tend the fire. Vey pointed toward the open door. \"Everyone who chooses.\" The Sovereign bowed its head. The guardian was not destroyed. It was released from a duty no one had asked it to carry alone. The second movement art awakened. The Wayfarer felt the wall beside them become a path. The mark of Wall-Jump appeared. The ability was the art of finding a foothold where a wall had once seemed final. It did not break the wall. It changed the relationship between the traveller and the wall. The Wayfarer leapt from stone to stone. They reached a high ledge. The mountain no longer felt like a prison. It felt like a place with many ways through."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 5 — A place for the next guest"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Vey's promise"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "After the Sovereign's release, Ember Hollow gathered around the public fires. No grand ceremony was held. The city had no reason to celebrate one guardian's suffering. Instead, the people made a schedule. Every hearth would have several keepers. No keeper would be required to serve beyond their strength. A person could step away without explaining why. A person could return when they were ready. The empty circles remained. Some were filled with cups. Some were filled with small stones. One was filled with a paper star. The open place beside Vey's hearth remained empty. The Wayfarer asked whether the unknown guest had arrived. Vey smiled. \"Perhaps.\" \"Who?\" \"All of you.\" The Wayfarer sat. Iri sat. Vey sat. A fourth cup was placed nearby. No one claimed it. A child arrived and took it. The child had been cold. The chair had been waiting for them. Vey did not ask their name. The child offered it anyway. The name was Sella. Vey repeated it carefully. The child smiled. The hearth grew warm. That evening, Vey returned the small cup to the stall. The cup no longer needed to wait. The promise had become a practice. It could continue without him."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Iri and the forgotten face"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri stood by the furnace after the crowd had gone. She watched the Quiet Flame move through the channels. The light reminded her of a memory. She remembered a person sitting beside an open window. She remembered the sound of a cup placed on wood. She remembered being asked whether a lantern could be a home. She had answered that a lantern was a way to find one. The face of the speaker remained hidden. Iri did not force it to return. She told the Wayfarer what she remembered. The Wayfarer asked whether the person had been kind. Iri said, \"They left the cup within reach.\" \"That sounds kind.\" \"Yes.\" \"Do you need to know their face?\" Iri thought about it. \"No.\" The lantern glowed. The second note rested beside the first. Iri began to hum. The melody had no words. It was enough for now."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The road to Frostglass"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road from Ember Hollow rose along the caldera wall. The air grew cold. A pale blue light appeared beyond the stone. Iri wrapped her wings close. The Wayfarer felt the lantern cool. Ahead lay a valley of glass and snow. The city of names waited beneath the aurora. Iri said that the next guardian feared change. The Wayfarer asked whether that made the guardian wrong. Iri answered, \"It made the guardian afraid.\" \"Can fear be dangerous?\" \"Yes.\" \"Can it also be understandable?\" \"Yes.\" The Wayfarer looked at the path. The second note warmed the lantern. The first note held the way behind them. The road ahead was not easier. It was open. They entered Frostglass Vale."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The Ember Hollow Chronicle — Recovered pages"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Cinderfall Entry"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The entry road descends through a chimney of black stone. Every wall bears the marks of old hands. Some marks show where a tool was lifted. Some show where a person stopped to rest. The city preserved the resting places as carefully as the workshops. A traveller could find a seat every few hundred steps. The seats were heated by warm stone. No one was asked to pay."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Ashen Barracks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The barracks were once used by the furnace guards. They became a place where workers could sleep between shifts. The old armour stands were turned into coat hooks. The weapons were melted into hinges. The room kept one bell. It rang when a worker had been awake too long. The bell did not summon a supervisor. It summoned a friend."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Coalworks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Coalworks no longer burned coal. It refined warmth from the deep stone. Its machines were designed to stop when unattended. The first machine had once run for twenty days. The worker who built it had collapsed beside the furnace. The city remembered that failure. Every machine now had a rest cycle. The rest cycle was part of the design."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Sootglass Gallery"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The gallery held windows made from cooled ash. Each pane showed a different colour when the moon crossed the mountain. The panes were not arranged by beauty. They were arranged by the people who had repaired them. A broken pane was never hidden. It was marked with a small silver thread. The thread reminded visitors that repair was part of the gallery."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Magma Reliquary"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The reliquary held the first tools of the ash-smiths. None had been polished. The tools were displayed with their worn handles. The city believed that a tool should be remembered by the work it had done. A hammer with a smooth handle had helped many people. A hammer with a chipped head had taught someone to slow down."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Furnace Run"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The run was a wide channel beneath the city. Warmth moved through it toward the public fires. The channel had small doors every few steps. A worker could close one section without stopping the whole system. The doors were called the mercy gates. They allowed a repair to happen without making the rest of the city cold."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Scoria Bastion"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The bastion was built around a cracked pillar. The pillar had once held the ceiling. It was no longer strong enough to carry the weight. The workers built new supports around it. They did not remove the pillar. It remained as a record of what had once been carried. The bastion taught that strength could include asking for help."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Smelter Depths"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The smelters worked in pairs. One person watched the temperature. Another watched the people. The city had learned that a safe furnace required both kinds of attention. A machine could be measured. A tired worker had to be heard."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Charred Throneway"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road led to an old throne room. The throne had been removed. A long table stood in its place. The seats were all different. Some were high. Some were low. One had wheels. The table was built so that no single chair could stand at its head."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Obsidian Kiln"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The kiln once made glass for the observatory. Its old plans were lost. Its tools survived. The glassworkers continued to make windows. They left a faint amber line in every pane. The line showed where the glass had cooled slowly. It made the windows stronger."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Embervault"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The vault held letters that had been written but never sent. Some were apologies. Some were invitations. Some were ordinary notes about bread, weather, and borrowed tools. The letters were not opened. Their writers had chosen to leave them private. The vault protected the choice, not the contents."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Black Foundry"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The foundry made the iron rings used by the Quiet Flame. The rings were not all the same size. Each was made to fit a particular hearth. A worker measured the stones before shaping the metal. The rings were built to serve the fire. The fire was never expected to serve the ring."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Pyreheart Tunnels"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The tunnels carried warm air toward the outer districts. A small ash hound lived near one bend. It guarded a broken vent. The vent was repaired before anyone attempted to move the hound. Afterward, the hound followed the workers for three days. It never asked to be given a name."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Crown of Ash"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The crown was a ring of chimneys worn by the Ember Sovereign. Each chimney represented a district. The crown was not meant to show rank. It was meant to show responsibility. When one chimney dimmed, the others were supposed to help. The Sovereign forgot this. The Wayfarer reminded it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Crucible Ring"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ring was the final chamber before the Last Hearth. It contained the channels that divided heat. The old system had been designed to let the Sovereign control every flame. The new system allowed each district to tend its own fire. The ring became a symbol of shared work."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Last Hearth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Last Hearth was not the oldest fire. It was the last one that had remained under a single keeper. Its ember was small. Its warmth was enough. When the Sovereign released it, the furnace did not become brighter. The city became warmer."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Dialogue folio — Vey and the Sovereign"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"You have been awake too long.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"The fire was not finished.\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"The fire is never finished.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then who will tend it?\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"The people who choose.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if they forget?\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then we remind one another.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if no one comes?\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then the fire rests.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"A city cannot rest.\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"A city is made of people. People must.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"You do not have to give the fire your memories.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"I have already given them.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then let the next memory be yours to keep.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"I do not remember how.\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"Sit beside the hearth.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"And then?\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"Nothing.\" "
          },
          {
            "text": "Sovereign:",
            "emphasis": "strong"
          },
          {
            "text": " \"Nothing?\" "
          },
          {
            "text": "Vey:",
            "emphasis": "strong"
          },
          {
            "text": " \"For a little while, nothing is enough.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Character page — The Ember Sovereign"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Ember Sovereign was once the Hearthkeeper. It was chosen because it knew the difference between a flame and a furnace. It believed that a hearth should make room for the cold. It believed that warmth had to be shared to remain gentle. When the Quiet began to gather, the public fires dimmed. The Hearthkeeper gave one memory to each district. The first memory warmed the western streets. The second warmed the market. The third warmed the bridges. The fourth warmed the barracks. The city praised the guardian. The guardian believed that praise meant the sacrifice was working. It gave away more. Soon, it could remember the heat but not the hands that had taught it to tend a fire. It became the Ember Sovereign. Its crown grew heavier. Its furnace grew hotter. It stood at the Last Hearth and never sat down. The people thought it was protecting them. The guardian thought it was keeping a promise. Both had forgotten the promise's condition. No one was supposed to carry the fire alone. When the Wayfarer arrived, the Sovereign expected another demand. Instead, they brought the first note. Return. The first note reminded the Sovereign that a door could remain open. Vey brought the iron ring. The ring reminded it that warmth could travel. The second note returned. The Sovereign learned to rest. It remained a guardian, but its work became shared. Its crown became a set of open chimneys. Its throne became a bench beside the public fire."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Sovereign speaks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "\"I remember the heat.\" \"I remember the fear of the streets growing cold.\" \"I remember giving something away.\" \"I do not remember the first thing I gave.\" \"I thought I could become a furnace.\" \"I thought a furnace could not become tired.\" \"I was wrong.\" \"The city was never asking me to burn.\" \"It was asking me to stay.\" \"I mistook staying for never leaving.\" \"I mistook love for endurance.\" \"Vey kept a place open.\" \"The people kept the fires in turns.\" \"The Wayfarer brought a road into the room.\" \"I can sit now.\" \"I can listen.\" \"I can let the flame be small.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Ending beat of Act II"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer stood on the high bridge above the caldera. The city lights glowed in separate windows. No single furnace held them all. Vey waved from the market. The Sovereign sat beside the Last Hearth. Iri carried the lantern. The green and amber notes rested together. A cold wind descended from the north. The lantern's glass frosted at the edges. Ahead, a blue-white aurora crossed the mountains. Iri looked at the light. \"Frostglass Vale.\" The Wayfarer asked whether the names there were safe. Iri answered, \"They have been kept very carefully.\" \"Is that good?\" \"It depends on whether the people are allowed to change.\" The road climbed. The warmth of Ember Hollow remained behind them. It did not vanish. It had become a hundred small lights."
          }
        ]
      }
    ]
  },
  {
    "id": "act-three",
    "title": "III · The Library of Unsaid Names",
    "subtitle": "Frostglass Vale · Name",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "Act III — The Library of Unsaid Names"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The third note: Name.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The third guardian: The Hollow Monarch.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The movement art awakened: Double-Jump.",
            "emphasis": "strong"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 1 — The valley beneath the aurora"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road from Ember Hollow rose into blue air. The warmth faded slowly. The stone grew pale. Snow fell without touching the ground. It drifted through the valley like a thought that had not yet settled. Above the mountains, an aurora unfolded in ribbons of white and lavender. Frostglass Vale was beautiful in the way a held breath was beautiful. Every bridge was clear. Every tower was quiet. Every window reflected a face that might have been standing somewhere else. The Wayfarer stepped onto the first glass causeway. Their reflection moved a fraction too late. Iri stopped. \"Do not ask the ice what it remembers.\" \"Why?\" \"It remembers everything that was said near it.\" \"That sounds useful.\" \"It also remembers what people were not ready to say.\" The Wayfarer looked down. The ice beneath their feet held a faint image of a city. It was Moonwake. The observatory stood bright. People crossed the streets. A figure walked beside Iri. The face was blurred. Iri looked away. The Wayfarer did not ask. A door opened in the cliff. Beyond it, shelves of ice rose into the mountain. The Name Library waited. A voice spoke from somewhere inside. \"Please leave the names where you found them.\" Iri answered, \"We have not come to take them.\" The door opened wider. The voice said, \"Everyone says that first.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 2 — The Name Library"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Edda, keeper of shelves"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Edda stood at a desk carved from blue ice. Her coat was lined with soft wool. Her hands were ink-stained. A small silver chain held a key around her neck. The key opened no door. It was a reminder of a door she had chosen to keep closed. Edda looked at the Wayfarer. Then she looked at the lantern. \"That should not be here.\" \"It has travelled with us.\" \"It should not be here,\" she repeated. Iri stepped forward. \"Edda.\" The keeper's expression changed. She knew Iri's voice. She did not know whether she trusted it. \"You have returned.\" \"I think I have.\" \"That is not how returns work.\" \"Perhaps I am learning.\" Edda turned toward the shelves. \"Names are kept in the inner stacks.\" \"Are they safe?\" \"They are preserved.\" \"That is not the same thing.\" Edda looked sharply at the Wayfarer. \"Who taught you to say that?\" The Wayfarer did not know. The lantern warmed. Edda opened a ledger. Every page held a name. Some names were written in silver. Some were written in blue. Some had been crossed out. Some had been written again in a different hand. A few pages were blank. Edda touched a blank page. \"These are the most difficult.\" \"Why?\" \"Because no one knows what they should say.\" The Wayfarer asked whether a blank page meant someone had been forgotten. Edda said, \"Sometimes.\" Then she corrected herself. \"Sometimes it means someone has chosen not to be recorded.\" She placed the ledger on the desk. \"I have not always known the difference.\" Iri looked at her. \"Neither have I.\" The two stood in silence. The library listened."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The shelves of names"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Name Library was built in three descending levels. The upper shelves held names that people had chosen to share. The middle shelves held names entrusted to the archive by families and friends. The lower shelves held names whose owners had not yet returned to decide what should happen to them. The lowest room was sealed. Edda said it contained the names that the Quiet had touched. The Wayfarer asked whether those names could be recovered. Edda said that some could. Some could not. Some no longer belonged to the person who had first carried them. The Wayfarer asked how a name could stop belonging to its owner. Edda answered, \"It cannot.\" Then she looked at the sealed door. \"I have behaved as though it could.\" She opened the upper shelves. The first name glowed. It belonged to a person who had asked to be remembered as a gardener. The next name belonged to someone who had left the valley. The third belonged to someone who had changed it twice. Edda had recorded every version. She had also written the date on which each version was chosen. The Wayfarer asked why. \"So no one could claim the earlier one was the true one.\" \"Was that a problem?\" \"It became one.\" Edda closed the book. \"People began to ask which name was the original.\" \"Which one was?\" Edda looked toward the blank page. \"The one the person chose to carry now.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "A quiet room for changing names"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The room was small. It contained a mirror, a chair, and a bowl of water. No one was allowed to record what was spoken there. A person could sit. They could speak a name. They could leave without speaking. They could ask for a new name. They could ask for the old one to be removed from the public shelves. The room had been built after the first frost. The Hollow Monarch had once praised it. Later, the Monarch had ordered it sealed. Edda kept the key. She had not used it. The Wayfarer asked whether the room could be opened again. Edda said that doing so would mean admitting the library had been wrong. Iri answered, \"A library is not a person.\" Edda looked at her. \"A library can still hurt people.\" \"Yes.\" \"Then it can still change.\" The Wayfarer waited. Edda took the key from her neck. She opened the room. A small warmth passed through the ice. The mirror reflected no face. It reflected the chair. That was enough."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 3 — The name without ink"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The keeper's lost name"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Edda knew every shelf. She knew the order of every letter. She knew the oldest names by sound. She could find a page by remembering the rhythm of its first syllable. She could not remember her own name. The Quiet had taken it while she was copying the names of the valley. At first, she had asked the archive to find it. The archive found a dozen possibilities. She rejected each one. Some belonged to people she had loved. Some belonged to people she had never met. Some belonged to a person she might once have been. She decided that she would wait until the true name appeared. Years passed. The name never returned. She began to believe that she had no right to choose a different one. The Wayfarer asked whether a name had to come from the past. Edda looked at the floor. \"That is what the Monarch taught us.\" \"Did the Monarch ask you to believe it?\" \"It did not have to.\" \"Why not?\" \"Because I was afraid.\" The Wayfarer asked what she was afraid of losing. Edda answered, \"The proof that I had ever been here.\" Iri said, \"You are here now.\" Edda closed her eyes. The sentence made her angry. Then it made her tired. Then it made her hopeful. She took the ledger from the desk. She opened to the page that had been blank for centuries. She wrote one word. Edda. She did not know whether it had been her first name. She knew that it was the name she chose to use. The ink did not freeze. The paper warmed. The library made room."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quest — The Name Without Ink"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer returned to Edda after exploring the name shelves. The keeper held two pages. One contained the name she could not remember. The other contained the name she had chosen. She asked which page should be kept. The Wayfarer asked whether she wanted both. Edda said she did not know. She feared that keeping the old name would make her feel trapped. She feared that destroying it would make her feel erased. The Wayfarer did not tell her what to do. They offered two paths. Speak Edda's name with her. Or let Edda choose when to remember. The Wayfarer chose to let Edda choose when to remember. The keeper folded the old page. She placed it in the private room. The page was not destroyed. It was not placed on public display. It could remain until Edda wished to open it. The new page stayed on the desk. It held the name she carried now. Edda said, \"I thought a name was a door that only opened one way.\" The Wayfarer asked what it was now. \"A room with more than one entrance.\" The keeper smiled. The third companion thread was remembered. The library's lower shelves began to thaw."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The voices beneath the ice"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "At night, the library spoke. The voices were not ghosts. They were memories preserved in the ice. A child asked whether their name could be longer. A traveller asked whether a name could be carried across a border. An old woman asked whether the name she used for herself could be different from the one her family used. A person who had left the valley asked whether the archive would keep their old name private. The ice answered each question with a small movement. The Wayfarer listened. Edda stood beside them. She did not write anything down. The voices grew calmer. One voice asked whether a person could be remembered without their name. The Wayfarer looked at Iri. Iri said, \"Yes.\" A second voice asked whether a name could be remembered without the person. Edda answered, \"Only as a record.\" The voice asked whether a record was a person. Edda said, \"No.\" The library grew warmer. A crack appeared in the sealed door. The Hollow Monarch had heard the answers. It began to wake."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 4 — Glass Causeway"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The bridge that changed"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Glass Causeway crossed a frozen river. Its surface was clear. Beneath it, currents moved in slow circles. The bridge had once been a wall around the Name Library. The first keeper of the vale had built it to protect the shelves. When the river rose, the wall became a bridge. The people began to cross it. The keeper tried to restore the wall. The river rose again. The bridge returned. The people called it a lesson. The Monarch called it a failure. A glacier warden stood near the centre. Its shield was clear as a winter morning. It raised the shield before sending a low wave of ice across the bridge. The Wayfarer watched the warning. They climbed onto a high platform. The wave passed beneath them. The guardian lowered its shield. The Wayfarer struck once. The shield cracked. The guardian stepped back. It did not attack again. The Wayfarer asked why. The creature pointed toward the bridge. A small crack had formed beneath a support. The Wayfarer repaired the support with a piece of iron from Ember Hollow. The glacier warden lowered its head. The bridge steadied. The creature moved away. The Wayfarer had not defeated it. They had answered its concern. The bridge led to the White Mirror. The second hidden memory of the act waited there."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Secret — The White Mirror"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The White Mirror stood in a narrow room. It had no frame. It was made from one sheet of clear ice. The Wayfarer approached. Their reflection appeared. Then the reflection changed. It showed Edda with a name written above her head. The name was not Edda. The letters began to melt. Edda entered the room. She looked at the mirror. For a moment, she seemed to recognise the name. Then she looked away. The Wayfarer asked whether the mirror had shown her true name. Edda answered, \"It showed a name I once carried.\" \"Do you want it back?\" \"I want to know that I could have carried it.\" The ice softened. A small shard fell into the Wayfarer's hand. The secret mark appeared. It did not reveal the name. It revealed the choice. Edda had once asked the library to remember her. Later, she had asked it to stop speaking for her. The mirror kept both requests. The Wayfarer placed the shard in the lantern. The glass gained a thin blue line. The room became quiet. Edda said, \"Thank you for not asking what it said.\" The Wayfarer nodded. The mirror remained blank."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 5 — The Hushed Throne"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Monarch of held names"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Hushed Throne stood at the end of the vale. It was built from white ice and dark glass. Its halls were lined with frozen names. Every name had been preserved perfectly. No letter had melted. No voice had changed. No person had been allowed to grow beyond the page. The Hollow Monarch stood beneath the highest arch. Its crown was made from frozen script. Its cloak carried the names of entire families. Its hands were clear as glass. It watched the Wayfarer enter. \"You have brought the notes.\" \"We have carried them.\" \"That is not the same.\" \"No.\" The Monarch looked at Edda. \"You opened the private room.\" \"Yes.\" \"You let a name remain unwritten.\" \"Yes.\" \"You allowed a person to change.\" \"Yes.\" The Monarch raised its hands. Two crescents of ice moved across the floor. The Wayfarer jumped. A pause followed. Then a star of ice fell from above. The attack came in a pattern. The Wayfarer learned the pattern. They moved between the marks. They struck when the Monarch paused. The first strike cracked the crown. The second made the frozen names tremble. The Monarch awakened. Its voice grew louder. \"You will lose them.\" \"Some things are lost.\" \"Then you will have nothing.\" \"We will still have one another.\" The Monarch sent two more crescents. The Wayfarer crossed the arena. The ice beneath their feet broke. They jumped again. The double-jump art had not yet awakened. They fell toward the lower platform. The lantern flashed. A pale blue line appeared beneath them. The Wayfarer landed. The Monarch lowered its head. The battle continued. The Wayfarer used the lantern strike. The frozen pages opened. Names escaped as small lights. They did not fly toward the Monarch. They flew toward the library. The Monarch watched. For the first time, it looked afraid."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The frozen choir"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The choir began as a sound beneath the floor. It was made from the names that had been held too long. Some voices were angry. Some were gentle. Some had forgotten the words they wished to say. The Monarch tried to silence them. Edda stepped forward. She spoke her chosen name. The choir answered. She said, \"You belong to yourselves.\" The voices grew stronger. The Monarch's crown began to melt. The Wayfarer did not strike. They waited. The Monarch lowered its hands. The final note of ice fell from the crown. It landed in the centre of the chamber. The third note returned. Name. It entered the lantern. The guardian's face changed. Beneath the crown was a person who had once been called the Keeper of Names. The Monarch asked whether the archive would forget it. Edda answered, \"The archive will remember what you choose to leave.\" The Monarch said, \"I do not know what that is.\" Edda replied, \"Then you may begin with nothing.\" The guardian looked at the blank page. It began to cry. The tears did not freeze. They fell into the clear pool beneath the throne. The pool reflected the aurora. The names were released to their owners. Some returned to the shelves. Some disappeared into the valley. Some remained unspoken. The library no longer treated silence as a failure. The third note rested beside the first two. The double-jump awakened. The Wayfarer felt the air hold them for a brief second. They leapt once. Then they leapt again. The higher platform was no longer unreachable. The wall had become a path through the air."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 6 — The name that changes"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Edda's page"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "After the Monarch's release, Edda returned to the private room. She placed the old page in a small drawer. She placed the new page on the desk. The drawer was unlocked. The desk was in the open. She did not throw away the old name. She did not make the new name permanent. She said that she might change it again. The Wayfarer asked whether that would trouble the archive. Edda smiled. \"The archive will learn.\" She removed the silver chain from her neck. The key no longer had to remind her of a closed door. She placed it beside the blank page. The key could open the private room. The room could remain open. The library had changed its law. No record would be shown without permission. No person would be required to keep an old name. No person would be forced to choose a new one. A name could be held. A name could be released. A name could be changed. The person remained more than the record."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Monarch's apology"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The former Monarch sat beside the pool. It had no crown. Its hands were bare. The Wayfarer sat at a respectful distance. The Monarch said that it had believed preservation was kindness. It had been afraid that every change would become a loss. It had frozen the names to keep the Quiet from reaching them. It had also frozen the people who carried them. The Wayfarer asked whether the Monarch regretted it. The guardian said yes. It also said that regret did not restore the years. Edda joined them. She did not forgive the Monarch immediately. She told it that they could begin with the shelves. The Monarch asked what to do. Edda said, \"Open the doors.\" The Monarch rose. Together, they opened the lower stacks. No fanfare followed. No name returned all at once. The work would take time. The Monarch accepted that. It was the first time it had accepted a task with no final measure. The Wayfarer left the room. Iri remained behind. She sat beside Edda. The lantern glowed between them. Neither spoke. The silence was no longer a punishment."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The road to the Astral Archive"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The valley's aurora grew brighter. A star appeared above the Hushed Throne. It moved from one part of the sky to another. Nym's map had begun to change. The Wayfarer looked toward the distant observatories. Iri said that the next kingdom would be difficult to follow. \"Why?\" \"Because the stars do not always agree with the map.\" \"Which one should we trust?\" \"Both, when they are useful.\" \"And when they are not?\" \"Then we ask where the people are.\" The Wayfarer touched the three notes. Return held the path. Hearth held the warmth. Name held the choice. The lantern's light was steadier. The road opened across the snow. Frostglass did not close behind them. The names had been given back to their owners. The valley was learning to speak in the present tense. The Wayfarer and Iri climbed toward the stars."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The Frostglass Chronicle — Recovered pages"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Glacier Mouth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The valley began at a blue stone opening. The walls were smooth from centuries of wind. A small inscription read: \"Enter as you are.\" The inscription had been carved by someone who did not wish to be named. The snow had never covered it. The glacier kept the words visible without keeping the hand that carved them."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Blueice Causeway"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The causeway had been built from transparent ice. It reflected the sky beneath the travellers. Its surface changed slowly with the season. A bridge that never changed would have become a wall. The vale had learned to let its roads move."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Frozen Choir"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The choir was a chamber of names spoken softly. No singer stood at the centre. The voices moved through the ice. They were not required to sing together. Each voice had its own pace. The choir was beautiful because no one was forced into harmony."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Snowblind Halls"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The halls were built to shelter travellers from white storms. Every corner held a bench. Every bench held a small lamp. The lamps were turned low so that a tired person could sleep. No one was asked to explain why they had stopped."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Crystal Burrows"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The burrows were tunnels cut by water through the ice. They connected rooms that had once been separate. The tunnels changed after every thaw. The people of Frostglass stopped trying to keep a permanent map. They began to leave signs that could be moved."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Rime Library"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The library held books written in frost. The words appeared only when the reader breathed gently. A hurried reader saw only white pages. The library taught patience without saying that patience was a virtue. It simply waited."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Whitefang Pass"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The pass was named for a pale ridge that resembled a tooth. It was a dangerous route. The guides marked safe places with small blue stones. The stones were never removed after a journey. A future traveller might need them."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Shiverdeep"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Shiverdeep was a cavern that held the sound of winter. It did not contain the coldest ice. It contained the longest echo. Travellers heard their own voices return from distant walls. Some heard a word they had forgotten. Some heard nothing. Both were allowed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Mirrorfrost Gallery"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The gallery was filled with mirrors that did not reflect the present. Each mirror showed a choice. The mirrors did not reveal what would have happened. They revealed what the person had feared, hoped, or wondered. Visitors were asked not to treat the reflections as instructions."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Pale Reservoir"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The reservoir held water from the first thaw. The water was clear. It carried small pieces of ice that moved like stars. The keeper of the reservoir never drank from it. The water belonged to the valley."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Winterglass Vault"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The vault held names entrusted to the archive. Its doors had no locks. They opened only when the keeper asked permission to enter. The names inside were not secrets. They were private."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Silent Keep"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The keep was built as a shelter. It later became the Monarch's fortress. After the guardian's release, the people turned it into a school. Its first lesson was that a record is not a person."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Frostworn Chapel"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The chapel had no altar. It had a circle of mirrors. Visitors could sit and speak a name. They could also sit without speaking. The room did not distinguish between the two."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Boreal Maze"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The maze moved with the aurora. It was impossible to map completely. Nym once tried. The map grew too large to carry. The Wayfarer crossed it by following the sound of people calling to one another."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Stillness Ring"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ring was the chamber of the Hollow Monarch. Its floor held the outlines of names. The lines were beginning to soften. The ice was learning that release could be gentle."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Heart of Winter"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Heart of Winter was the pool beneath the throne. It was not frozen. It held the third note. The water reflected every face without asking for a name. The vale called it the place where a person could begin again."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Dialogue folio — Edda, Iri, and the Monarch"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"I have kept every name.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Have you kept every person?\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"No.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Can the difference be repaired?\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"Not by the archive alone.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"I believed the names would vanish.\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"Some changed.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"I thought change was the first step toward loss.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Sometimes it is the first step toward living.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"And the names I cannot return?\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"Do not invent them.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"And the people I cannot find?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Leave a way for them.\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"A record may wait.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"A person must be free to arrive.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"I can open the lower shelves.\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then begin there.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"You do not need to become who you were.\" "
          },
          {
            "text": "Monarch:",
            "emphasis": "strong"
          },
          {
            "text": " \"What may I become?\" "
          },
          {
            "text": "Edda:",
            "emphasis": "strong"
          },
          {
            "text": " \"Someone who listens.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Character page — The Hollow Monarch"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Hollow Monarch was once the Keeper of Names. It had been a careful archivist. It believed that a name should never be lost. It had watched people forget one another during the first winter of the Quiet. It had seen a family search for a name that no longer answered. It had seen a traveller arrive with a new name and be told that the old one was the only true one. The keeper tried to protect the names. It froze them. At first, the ice was a shelter. Later, it became a cage. The keeper began to believe that a living person was less reliable than a perfect record. It stopped asking permission. It stopped opening the private room. It stopped allowing the names to change. The shelves filled. The people grew silent. The keeper became the Hollow Monarch. Its crown was made from the names it could not release. Its throne was a promise that had forgotten its purpose. The Wayfarer did not defeat the Monarch by destroying the archive. They defeated it by returning choice to the people. The Monarch's crown melted. The notes were released. The keeper became a listener again. It continued to repair the library. It did not ask to be forgiven as a condition of that work. It accepted that the people could decide for themselves."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Monarch speaks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "\"I kept the names because I feared the silence.\" \"I made the shelves taller.\" \"I made the doors heavier.\" \"I made the records perfect.\" \"I forgot that a person could change.\" \"I forgot that a name was not a chain.\" \"I forgot that permission could be withdrawn.\" \"I called the ice a shelter.\" \"I did not notice when it became a wall.\" \"Edda opened the private room.\" \"The voices beneath the floor were not ghosts.\" \"They were people asking to be allowed to speak.\" \"I cannot return every year I kept them still.\" \"I can open the shelves.\" \"I can leave the pages blank.\" \"I can learn to ask.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Ending beat of Act III"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer climbed the ridge beyond Frostglass. The aurora moved above them. The third note glowed blue in the lantern. Edda stood at the library door. She held two pages. One was private. One was open. She waved. The Wayfarer waved back. Iri watched the valley. \"She chose a name.\" \"Yes.\" \"Will she keep it?\" \"That is her choice.\" The Wayfarer smiled. The road ahead crossed the midnight sea. Beyond it, observatories turned around one another. A map hung in the sky. One room remained blank. The Wayfarer asked whether the blank room was a mistake. Iri answered, \"No.\" \"What is it?\" \"A promise that the story is not finished.\""
          }
        ]
      }
    ]
  },
  {
    "id": "act-four",
    "title": "IV · An Atlas of Impossible Stars",
    "subtitle": "Astral Archive · Distance",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "Act IV — An Atlas of Impossible Stars"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The fourth note: Distance.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The fourth guardian: The Astral Warden.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The movement art awakened: Star Grapple.",
            "emphasis": "strong"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 1 — The sea without a shore"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road from Frostglass did not descend. It crossed the night. A stairway of pale stone extended over a black sea. The sea reflected stars that were not visible above. The Wayfarer walked beside Iri. The lantern held three notes. Their lights did not blend. Green, amber, and blue remained distinct. They made a small constellation inside the glass. At the far end of the stairway, an observatory turned slowly in the sky. Then another observatory appeared beside it. Then a third. The Astral Archive was not a building. It was a collection of rooms that had learned to travel. Some floated above the sea. Some drifted through the sky. Some appeared only when a traveller stopped looking for them. The Wayfarer reached the first platform. A star construct stood there. Its body was made from brass lines and pale stone. It drew a bright line through the air. The Wayfarer moved away. A pulse travelled along the line. The construct lowered its hands. It had not meant to trap them. It had been showing them where the path would become unsafe. Iri studied the floating platforms. \"Do you know where we are?\" \"We are in the Astral Archive.\" \"That is a name.\" \"Is that not enough?\" \"It is a name for a place that does not stay in one place.\" The Wayfarer looked at the observatories. \"Then where are we going?\" Iri smiled. \"That is a better question.\" The stars moved. A new path appeared. It led toward the scriptorium."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 2 — The Astral Scriptorium"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Nym, cartographer of the night"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym stood beside a table that held a moving map. The map was larger than the room. Its edges folded upward into the dark. A silver compass rested at its centre. The compass had no needle. It pointed toward whatever the traveller hoped to find. Nym watched the Wayfarer enter. \"You are late.\" \"We did not know we were expected.\" \"That is why you are late.\" Iri bowed her head. \"Nym.\" The cartographer looked at her. \"Your wings are different.\" \"I have forgotten why.\" \"Perhaps they are different because you have changed.\" Nym turned back to the map. A route appeared. It crossed the sea. It passed through a room that did not exist. It ended at a blank circle. The Wayfarer asked what the circle represented. Nym said, \"A room I have not drawn.\" \"Why not?\" \"Because I have not found it.\" \"Have you looked?\" \"Every day.\" \"Then why not draw it?\" \"Because a map should not pretend.\" The Wayfarer looked at the compass. It pointed at the blank circle. Nym noticed. \"That is not possible.\" \"Why?\" \"The compass points toward a destination.\" \"Perhaps it points toward a question.\" Nym looked at the Wayfarer for the first time. Then they looked at Iri. \"Have you brought another question into my archive?\" Iri answered, \"We have brought the notes.\" Nym's expression changed. The stars in the map brightened. \"Then the Quiet is close.\" \"It has always been close,\" Iri said. Nym folded the map. \"That is not what I meant.\" The room grew quiet. Nym pointed toward the orbit gallery. \"Come with me.\" The journey through the Archive had begun."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The map that moved"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Astral Scriptorium held every map that had ever been made. Some were made from paper. Some were made from brass. Some were made from light. One was made from a person's footsteps. Another was made from the time it took a message to reach someone. The oldest map had no place names. It showed only distances. Nym had built a new map every year. The map had grown too large to carry. It contained every route the cartographer had ever considered. It showed roads that were abandoned. It showed paths that had been chosen. It showed places that had changed their names. It showed a hundred possible futures. The map was beautiful. It was also heavy. Nym could not leave it. The Wayfarer asked why. Nym answered, \"Because if I stop drawing, someone may choose the wrong path.\" \"Who?\" \"Anyone.\" \"Can a map prevent every mistake?\" \"No.\" \"Then what is the map for?\" Nym stared at the table. \"I thought it was to prevent regret.\" Iri said, \"A map cannot do that.\" Nym did not answer. A star construct moved through the far arch. It drew a bright line. The map drew the same line. The line ended at a place marked \"unresolved.\" Nym closed the atlas. \"That is where we go next.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "A room for possible routes"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The room contained three doors. One door was marked with a star. One was marked with a moon. One had no mark. Nym opened the star door. Inside was a map of a future where the Astral Warden had never been challenged. The observatories were still turning. The cartographer was still drawing. The blank circle had become a throne. Nym closed the door. They opened the moon door. Inside was a map of a future where the Quiet had swallowed the Archive. The stars remained visible. No one could travel between them. The map showed every room. It showed no person. Nym closed the door. They stood before the unmarked door. They did not open it. The Wayfarer asked why. Nym answered, \"I do not know what is inside.\" \"That is why it is a door.\" Nym shook their head. \"What if it leads nowhere?\" \"Then we will have learned something.\" \"What if it leads somewhere we cannot return from?\" \"Then we should decide together whether to enter.\" Nym looked at the blank door. For the first time, they did not ask the map for permission. They opened it. Inside was an empty room with a window. The window showed the stars from a different angle. Nothing else waited there. Nym began to laugh. It was a sound that had been missing from the Archive. The room had not been a mistake. It had been a space for possibility."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 3 — The Blank Constellation"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The cartographer's promise"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym had drawn the same constellation for a thousand years. It was called the Fixed Path. Every star had a place. Every line had a reason. Every traveller could follow it. The constellation was intended to guide people toward the five notes. It had become a promise that no one would ever be lost. Nym believed that promise. They had lost someone in the first winter of the Quiet. They could not remember the person's name. They remembered a hand reaching across a gap. They remembered letting go. They had drawn the Fixed Path so that no one else would have to make the same choice. The map had become more detailed. The routes had become safer. The cartographer had become more alone. Nym told the Wayfarer that the blank room frightened them. It had no route in. It had no route out. It had no marker that said what should be done. The Wayfarer asked whether Nym wanted the room to be mapped. Nym said yes. Then they said no. Then they said they did not know. Iri answered, \"You can leave it blank until you decide.\" Nym looked at her. \"Can a blank place be useful?\" \"Yes.\" \"Can it be part of a map?\" \"Yes.\" \"Can it matter?\" \"More than you know.\" Nym returned to the table. They erased the final line of the Fixed Path. The map became smaller. The room grew brighter."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quest — The Blank Constellation"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym asked the Wayfarer to choose what should be drawn in the last room. They offered two possibilities. Leave the final star unmarked. Or draw a path for whoever comes next. The Wayfarer chose to leave the final star unmarked. Nym waited for the map to collapse. It did not. The blank circle remained. The compass no longer pointed toward it. It pointed toward the Wayfarer. Nym looked surprised. \"Why?\" The Wayfarer said, \"Because we are here.\" Nym studied the map. They understood that the blank room was not empty. It was occupied by the choice not to decide. The cartographer placed a small silver frame around the circle. The frame did not contain a star. It held the space where a star might appear. The quest was remembered. Nym's trust increased. The fourth companion thread began. The map unfolded a new route. It led toward the Orbit Gallery."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The people between stars"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Astral Archive had no permanent residents. Some scholars stayed for one night. Some stayed for a century. Some travelled between the observatories and returned only when a certain star appeared. The Archive had become a home for people who did not wish to stay in one place. Its halls held letters from distant worlds. Some letters had taken centuries to arrive. Some had been written to people who were still alive. Some had been written to people who had changed their names. The Archive kept the letters in moving drawers. A traveller could ask for a letter to be delivered. The archivist did not ask why. A small group gathered around a table. They were sharing a map. Each person had marked a different route. The map was full of lines. No line was labelled correct. The group was planning to meet again. They did not know where. They knew how to find one another. The Wayfarer asked Nym whether the Archive had always been this way. Nym said no. It had once been a place for scholars who believed the stars could predict the future. It had changed when the first traveller arrived with a map that showed no destination. The traveller had said that they wanted to see what would happen. Nym remembered that sentence. They had forgotten everything else."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 4 — Orbit Gallery"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The drake that followed a map"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Orbit Gallery hung beneath a ring of stars. Its floor moved slowly. Its walls were made of glass. A pale drake circled the gallery. It folded its wings before diving. The Wayfarer watched its path. The drake always attacked the place where the traveller had been. It did not follow their current position. It followed the previous one. Nym studied the pattern. \"It is following an old map.\" \"How can you tell?\" \"It repeats the same route even after the room changes.\" The Wayfarer moved in a new direction. The drake dived toward the empty space. It struck a platform. The platform shifted. The gallery tilted. Nym grabbed the rail. The Wayfarer moved toward the centre. They did not attack the drake. They waited for it to circle. When it folded its wings, the Wayfarer moved. The drake passed overhead. Its shadow crossed the lantern. The creature landed on a far ledge. It looked confused. Nym placed a small star chart on the floor. The drake approached. The chart showed a different route. The drake followed the new line. It flew around the gallery. It did not attack again. The Wayfarer smiled. The drake had not been angry. It had been following instructions that no longer fit the world. Nym picked up the chart. They folded it. \"Perhaps I have been doing the same.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Secret — The Unwritten Orbit"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The hidden orbit was visible only from the upper gallery. It circled the blank room. No star marked its centre. The Wayfarer used the lantern. The orbit brightened. A memory opened. Nym stood beside Auralis. They were watching the observatories turn. Auralis asked whether the map could show a place that did not yet exist. Nym answered that a map could show only what had been measured. Auralis asked what happened when a traveller made a new path. Nym said that the map would have to change. Auralis smiled. \"Then leave room for the map to learn.\" The memory shifted. Nym placed a blank circle on the edge of the atlas. Auralis drew no line around it. She said, \"That is where the next person begins.\" The memory ended. The third secret mark appeared. The orbit did not lead to treasure. It revealed that the Archive had been designed to change. Nym had known this once. They had forgotten. The Wayfarer placed the fragment in the lantern. A faint lilac line appeared. Nym looked at the blank room. They did not try to fill it. They left it open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The observatory that could not stay still"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Orbit Gallery held a machine that moved the rooms of the Archive. It was called the Celestial Engine. The engine had no central gear. It worked by balancing distances. When one observatory moved closer, another moved away. The machine had been built so that no room could become the centre of the entire Archive. A small brass plaque read: \"No destination is the whole sky.\" The Wayfarer watched the machine turn. They saw the five notes reflected in its rings. Each note kept a different distance. Return made a path. Hearth made a meeting place. Name made a boundary. Distance made room. Witness made attention. The engine turned. A sixth space appeared. It was not a note. It was a pause between the rings. Nym stared. \"The margin.\" Iri looked at the lantern. \"The place we left unwritten.\" The Wayfarer asked whether the sixth space was dangerous. Nym answered, \"Only if someone tries to own it.\" The engine stopped. The route to the First Star opened."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 5 — The First Star"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Astral Warden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The First Star was the oldest observatory in the Archive. It was built around a single fixed point. The stars moved around it. The point did not move. The Astral Warden stood at its centre. Its body was made of pale brass and dark stone. Three sigils revolved around its shoulders. Each sigil marked a lane. The Warden raised its arms. The sigils spread. The Wayfarer waited for the gaps. The first orbit collapsed inward. The Wayfarer moved through the open lane. The second orbit changed direction. Nym called out the pattern. The third orbit split into smaller marks. The Wayfarer crossed the arena. The Warden struck the floor. The stars trembled. The Wayfarer attacked. The Warden's body flashed. Its sigils widened. It sent the next wave. The Wayfarer used the double-jump. They cleared the lower orbit. They landed on a high platform. The Warden looked up. Its face held no anger. It held a kind of grief. The Wayfarer understood that the Warden had been keeping the distance between the stars fixed. It believed that if the stars moved, the Archive would fall. The battle was not about winning. It was about showing the guardian that movement did not have to mean separation. The Wayfarer struck the third sigil. The orbit broke. The room opened. The Warden lowered its hands. It spoke. \"Distance is not the opposite of belonging.\" \"It is the room in which two lives can remain different.\" The fourth note returned. Distance. The light entered the lantern. The Warden's body became transparent. The stars moved again. No observatory fell. No room disappeared. The Archive had survived change."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Star Grapple"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The fourth movement art appeared as a line of violet light. It reached toward a high platform. The Wayfarer touched the mark. A small hook of starlight formed above their hand. They looked toward a distant ledge. The light reached. It held. The Wayfarer rose through the air. They landed on the platform. The grapple was not a chain. It was an agreement between two points. The Wayfarer could reach toward a place. The place could answer. The art required a visible anchor. It could not pull a traveller through a sealed door. It could not make a distant place belong to them. It could only bridge a gap that was already open. Nym watched. They smiled. \"I have drawn this route for a thousand years.\" \"Why did you not cross it?\" \"I thought the map should remain untouched.\" The Wayfarer offered a hand. Nym took it. They crossed the platform together. The fourth art awakened fully. The path toward the Quiet Beyond appeared. It ran through a space where no star remained. The lantern's four notes formed a small constellation. The fifth note waited in the silence."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 6 — The cartographer travels"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Nym's new atlas"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym returned to the Scriptorium. They opened the old map. They did not destroy it. They drew new routes beside the old ones. They marked places where the map had changed. They marked places where travellers had chosen not to continue. They marked rooms that were still blank. The Wayfarer asked whether the atlas was complete. Nym answered, \"No.\" \"Will it ever be?\" \"I hope not.\" The cartographer looked at the lantern. \"May I travel with you?\" Iri said that the road would be difficult. Nym smiled. \"That is why I would like to see it.\" The Wayfarer welcomed them. Nym did not become a permanent companion in every room. They travelled between the observatories and the road. They left maps where people needed them. They returned when the stars changed. The Archive accepted that a cartographer could leave. It had learned not to confuse a map with a home."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The fourth companion truth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym told the Wayfarer about the person they had lost. The person had been a friend. They had travelled together. They had crossed a bridge that appeared only once. Nym had been drawing the route. The friend had called from the far side. Nym had looked down to finish the map. When they looked up, the bridge had changed. The friend had crossed alone. Nym never learned whether they had arrived safely. The cartographer had spent a thousand years trying to draw a bridge that could not change. They had believed that certainty would prevent another loss. The Wayfarer asked whether the friend had wanted the map. Nym said that they had wanted Nym to come. The truth was simple. It was also difficult. Nym had been trying to save the past by refusing the next journey. They had confused remembering with staying. The Wayfarer did not tell them that the friend would have forgiven them. They could not know. They said, \"You can travel now.\" Nym nodded. The fourth thread was remembered. The map was no longer a cage."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The road beyond the stars"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Archive began to turn faster. The observatories moved apart. A dark horizon appeared beyond the sea. It was not empty. It was filled with rooms that had no walls. The Quiet Beyond had begun to show itself. The Wayfarer looked at the four notes. The lantern glowed. Green. Amber. Blue. Violet. Each light remained distinct. Iri held the lantern. Nym folded the atlas. They did not try to map the Quiet. They asked where the others were. The Wayfarer looked ahead. \"Somewhere we have not yet reached.\" Nym smiled. \"That is a good enough direction.\" The road to Hushwater opened. The Astral Archive remained behind them. Its stars continued to move. The blank room remained blank. It had not become a throne. It had become a beginning."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The Astral Chronicle — Recovered pages"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Starfall Vestibule"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The vestibule was the first room to appear when a traveller entered the Archive. It did not always appear in the same place. The door moved to meet the traveller. A brass sign read: \"You are allowed to arrive differently.\" The sign had been written by a cartographer who had once lost their way."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Orrery Walk"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The walk crossed a room of moving planets. Each planet represented a distance between two places. The orrery changed when someone moved. It was not designed to predict. It was designed to help people understand that a relationship could change without ending."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Cometglass Stacks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The stacks held letters written during long journeys. Some had taken years to arrive. The glass preserved the route, not the words. A traveller could see where a letter had passed. The sender could still ask for the contents to remain private."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Lost Constellary"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The constellary held stars that had been removed from old maps. Some were removed because they had moved. Some were removed because the mapmakers had changed their names. Some were removed because no one could agree where they belonged. The Archive kept them visible."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Moonlit Index"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The index listed every observatory. It did not list every path. The paths were allowed to change. A small note at the bottom read: \"A route may be true even when it is not permanent.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Gravity Well"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The well pulled objects toward its centre. It was used to test the balance of the Archive. The Wayfarer saw a small leaf fall upward. Nym said that the room was adjusting. It had been adjusting for a thousand years. No one expected it to finish."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Astral Scriptorium"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The scriptorium held the maps. Nym kept a table there. The table was larger than the room. The room had learned to fold around it. The archive did not call this impossible. It called it useful."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Shattered Meridian"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The meridian had once divided the sky into equal parts. It broke when the first observatory moved. The pieces were not repaired. They were made into bridges. The Archive learned that a broken line could still connect places."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Eclipse Atrium"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The atrium was dark during the day and bright during an eclipse. It held no clock. People met there when they wished to speak without knowing how long the conversation would last. The stars told them when to leave."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Celestial Engine"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The engine kept the observatories in motion. It had no throne. It had no central gear. It balanced the rooms so that no single one became the centre of everything. Its pause was the sixth space."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Nullstar Annex"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The annex held stars whose names had been removed. The Archive did not replace them. It left a small space where a visitor could write a name if they wished. Most spaces remained blank."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Chronology Vault"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The vault held timelines that had changed. It did not mark one as correct. It showed where people had made different choices. The Wayfarer saw one version of Moonwake that had never disappeared. They did not enter it. It was not their world to reclaim."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Forgotten Zodiac"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The zodiac held twelve old constellations. Each had once been used to predict a season. The stars had moved. The Archive kept the old shapes as history. It did not ask the sky to return to them."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Eventide Spiral"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The spiral connected rooms that were far apart. A traveller could walk one turn and arrive near the same place. A second turn led somewhere different. The spiral taught that repeating a journey did not guarantee the same arrival."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Observatory Ring"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ring was the path around the First Star. It held the four sigils of the Astral Warden. The orbit changed after the guardian's release. The Archive did not try to restore the old pattern."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The First Star"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The First Star marked the edge of the Archive. It was not the centre. It was the place where a route became a choice. The fourth note waited there. The sky became open again."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Dialogue folio — Nym, Iri, and the Warden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"The map is wrong.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Which part?\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"The part that says the way ends here.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then change it.\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if I draw the wrong route?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"We can change it again.\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if someone follows it?\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then leave room for them to choose.\" "
          },
          {
            "text": "Astral Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"The stars must keep their distance.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"They are still together.\" "
          },
          {
            "text": "Astral Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"They may drift.\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"They have always drifted.\" "
          },
          {
            "text": "Astral Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then the pattern will change.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"The pattern is not the people.\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"I spent a thousand years drawing a bridge.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"And now?\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"Now I will cross it.\" "
          },
          {
            "text": "Astral Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"Distance is room.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Room for what?\" "
          },
          {
            "text": "Astral Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"For two lives to remain themselves.\" "
          },
          {
            "text": "Nym:",
            "emphasis": "strong"
          },
          {
            "text": " \"That is a map I can carry.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Character page — The Astral Warden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Astral Warden was the guardian of Distance. It had been created to keep the observatories apart. The Archive moved because no room was allowed to become the centre of every route. The Warden believed that distance was a form of protection. It kept the stars from colliding. It kept the rooms from becoming one. It also kept people from travelling too freely. The Warden saw every new path as a possible collapse. It tried to preserve the first orbit. When the stars moved, it tightened the rings. The rings became chains. The Archive began to feel smaller. Nym drew more maps to compensate. The Warden interpreted the maps as proof that the routes were failing. The two guardians strengthened each other's fear. The Wayfarer arrived with three notes. Return made a path. Hearth made a meeting place. Name made a boundary. The Warden had to learn that Distance was not a wall. It was the space in which separate lives could meet without being erased. When the fourth note returned, the Warden released the orbit. It remained in the First Star. It watched the observatories move. It no longer tried to stop them. It learned to measure room rather than control movement."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Warden speaks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "\"I kept the stars apart.\" \"I thought closeness would make them disappear.\" \"I thought movement was the beginning of collision.\" \"I did not understand that a route could change.\" \"Nym kept drawing the same bridge.\" \"I kept asking the orbit to remain.\" \"We made the Archive smaller.\" \"You came with a light that carried four different colours.\" \"You did not ask the stars to become one.\" \"You allowed them to remain distant.\" \"Distance is not abandonment.\" \"Distance is room.\" \"Let the map change.\" \"Let the traveller choose.\" \"Let the stars move.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Ending beat of Act IV"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer stood at the edge of the Astral Archive. Nym held the atlas. Iri carried the lantern. The fourth note glowed violet. The stars moved without falling. The blank room remained behind them. It did not follow. It did not close. Ahead lay a dark horizon. It held the shape of a sea. It held the shape of a city. It held the shape of a voice that remembered every footstep. Iri looked at it. The lantern began to glow from within. She said, \"I know this place.\" The Wayfarer asked whether she remembered it. Iri answered, \"Not yet.\" Nym asked whether they should map the route. Iri shook her head. \"Not this one.\" \"Why?\" \"Because the Quiet will appear differently to each of us.\" The Wayfarer stepped forward. The four notes remained steady. The Quiet Beyond opened."
          }
        ]
      }
    ]
  },
  {
    "id": "act-five",
    "title": "V · The Quiet Between Heartbeats",
    "subtitle": "Quiet Beyond · Witness",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "Act V — The Quiet Between Heartbeats"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The fifth note: Witness.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The final guardian: Orin, the First Keeper.",
            "emphasis": "strong"
          },
          {
            "text": " "
          },
          {
            "text": "The final choice: What should the Lumen become?",
            "emphasis": "strong"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 1 — Hushwater"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The sea that reflects forgotten rooms"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The road from the Astral Archive ended at a shore. The water was dark. It reflected rooms rather than stars. A window appeared beneath the surface. Then a stair. Then the observatory dome. Then a room the Wayfarer had never entered. The Quiet Beyond had no single shape. It appeared as whatever a traveller remembered and whatever they could not. The Wayfarer stepped onto the water. It held their weight. Iri walked beside them. The lantern made a small circle of light. The four notes moved inside it. Green. Amber. Blue. Violet. They did not shine into the dark. They made the dark easier to look at. A voice came from beneath the water. It sounded like the Wayfarer's own voice. It said, \"You have come too far.\" The Wayfarer stopped. Iri held the lantern steady. The voice spoke again. \"You can turn back.\" The Wayfarer asked whether it wanted them to leave. The water rippled. A second voice answered. \"I do not know.\" The Quiet was not a person. It was many voices without a room. It was the weight of stories that had nowhere safe to go. The Wayfarer listened. The water settled. A path appeared beneath the surface. It led toward Hushwater Hall."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Quietling"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A quietling emerged from the water. It was small and pale. Its outline blurred whenever the lantern moved. It dimmed. It reappeared farther away. Then a slow wave crossed the shore. The Wayfarer jumped over it. The quietling repeated the pattern. It was not attacking. It was asking whether the Wayfarer would chase it. Iri spoke softly. \"We should not follow every voice.\" The Wayfarer waited. The quietling approached. It placed a small stone beside the lantern. The stone held the sound of a name. The name was not clear. It was enough to reveal that someone had once been heard here. The Wayfarer accepted the stone. The quietling faded. The water remained. The first room opened."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Iri's return to Hushwater"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri knew the shore. She had stood here before the observatory vanished. She remembered the water touching her boots. She remembered a lantern in her hands. She remembered someone asking whether the night could be kind. She could not remember who had asked. The Wayfarer asked whether she wanted to know. Iri said yes. Then she said she was afraid. The Wayfarer asked whether they should leave. Iri looked at the water. \"No.\" She took one step. The lantern glowed. The water reflected her face. For a moment, the reflection carried two names. Iri. Auralis. Neither name disappeared. The reflection did not choose between them. Iri smiled. \"I can be both.\" The lantern grew warmer. The fifth note was still missing. The path to Echo Court appeared."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 2 — Echo Court"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The room that returns"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Echo Court was made of doorways. Some doors led to rooms the Wayfarer had already visited. Some led to places they had imagined. Some opened into a sound. A footstep returned from the far wall. A laugh returned from above. A question returned from beneath the floor. The Wayfarer walked through the first doorway. It showed Mosslight. Pell sat beneath the bell flowers. The Wayfarer heard him say, \"Leave the path open.\" The second doorway showed Ember Hollow. Vey placed a warm cup beside an empty chair. The third showed Frostglass. Edda opened the private room. The fourth showed the Astral Archive. Nym left the blank room untouched. The Wayfarer understood that the journey had not been a line. Every kingdom had carried a piece of the same promise. The fifth doorway showed the Observatory. Auralis stood beside Orin. They were arguing. The sound was faint. The Wayfarer stepped closer. A shadow crossed the room. It was an eclipse shade. It left a delayed echo behind each movement. The Wayfarer watched the mark. They stepped away from the echo. The shade passed through the empty space. The Wayfarer struck once. The creature dissolved into a soft grey light. It did not scream. It left a small reflection on the floor. The reflection showed two people sitting side by side. Neither spoke. They stayed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The memory that is not yours"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer entered another doorway. It showed a room they had never seen. A child sat beside a window. The child was holding a lantern. A person stood behind them. The person was speaking. The child looked up. The words were not clear. The Wayfarer realised that the memory did not belong to them. They stepped back. The room remained open. Iri stood at the threshold. \"Do you recognise it?\" \"No.\" \"Good.\" \"Why?\" \"Because it is not yours to recognise.\" The Wayfarer looked again. The child lifted the lantern. A moth settled on the glass. The person behind them smiled. The Wayfarer asked whether it was Iri. Iri answered, \"It may be.\" \"Do you want to enter?\" \"Not yet.\" The Wayfarer left the room untouched. The doorway stayed open. It did not follow them. The Quiet had begun to learn a new shape. It was making space for people to keep their memories private."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Secret — The Room Behind Silence"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "At the end of Echo Court was a narrow door. It had no handle. The Wayfarer held the lantern near it. The door opened. Inside was a small room in Moonwake. Auralis stood beside an archive shelf. She was writing. A voice asked whether the catalogue was complete. Auralis answered, \"No.\" The voice asked whether she would finish it. Auralis said, \"Not without permission.\" The voice asked what would happen if someone never returned. Auralis answered, \"Then the page can wait.\" The memory shifted. Auralis removed her own name from a public ledger. She placed it inside the lantern. She was afraid. She did it anyway. The fifth secret mark appeared. It was a memory of a choice made when no one was watching. It revealed why Iri had feared the lantern. She had not erased her name to become a hero. She had done it to stop the Quiet from using the archive. The memory ended. Iri stood in the doorway. She did not look away. The Wayfarer held the fragment out. Iri touched it. The lantern brightened. A silver line joined the four colours. The fifth mark was complete. The path to the Underlight could now be opened."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 3 — The name Auralis"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The lantern's first keeper"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri stood in the room behind silence. She looked at the old shelf. She looked at the blank space where her name had been. The Wayfarer asked whether she remembered now. Iri said that she remembered the act. She remembered the fear. She remembered the hope that the lantern would keep the name without turning it into a lock. She did not remember every day before it. She did not remember every person she had met. She did not remember whether she had been happy. But she remembered choosing. That mattered. She placed the lantern on the floor. The light moved through the glass. The name Auralis appeared in a small circle. Iri looked at it. She did not touch it at first. Then she placed one hand beside the circle. \"My name was Auralis.\" The room warmed. She continued. \"I am Iri.\" The lantern held both names. The memory did not demand that one replace the other. The Wayfarer asked which name she wished to use. Iri smiled. \"I will decide each time.\" The fifth companion thread was remembered. Her trust grew. The lantern shone more steadily. She was no longer waiting for the archive to tell her who she had been. She was choosing who she would be."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quest — A Name for the Light"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri asked the Wayfarer what they would call the lantern. The Wayfarer could tell her the name Auralis. Or ask Iri to choose her own name. The Wayfarer asked Iri to choose. Iri looked at the lantern. She said that Auralis was the name she had carried before. Iri was the name she had carried through the forgotten years. She did not wish to discard either. She chose to keep both. The lantern answered with a small silver flame. It did not burn. It made the glass clear. Iri said, \"I thought the name would return like a key.\" The Wayfarer asked what it felt like. \"Like opening a window.\" The quest was recorded. The final companion thread was complete. Iri's trust reached its highest point. The Wayfarer did not gain a weapon. They gained a friend who could speak her own name."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 4 — The Moonheart"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The last room"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Moonheart was a room without a ceiling. A dark sky rested above it. The floor reflected the stars. At the centre stood the Lumen. It was broken. Five empty places surrounded it. Four notes shone inside the lantern. The fifth was still outside. Orin stood before the light. They looked older than the observatory. Their coat carried the dust of every kingdom. Their hands were empty. Their name was hidden. The Wayfarer stepped forward. Orin looked at the lantern. \"You have brought them back.\" \"We have carried them.\" \"That is not the same.\" \"No.\" Orin nodded. \"You learned.\" Iri stood beside the Wayfarer. Orin looked at her. \"Auralis.\" Iri did not answer immediately. Then she said, \"Iri.\" Orin lowered their head. \"Both are true.\" The Wayfarer asked whether Orin was the Quiet. Orin answered, \"No.\" \"Did you create it?\" \"No.\" \"Did you keep it?\" \"Yes.\" \"Why?\" Orin looked toward the Lumen. \"Because I thought I could hold it alone.\" The Wayfarer asked what the Quiet wanted. Orin said, \"It wants a place.\" \"Why?\" \"Because it has been made from everything that was not allowed a place.\" The Wayfarer looked at the broken light. Orin continued. \"I divided the Lumen to keep the world alive.\" \"You also left the Quiet alone.\" \"Yes.\" \"You made the same mistake as the Keepers.\" \"Yes.\" Orin did not defend themselves. The Wayfarer waited. The fifth note began to glow. It was not inside the lantern. It was in the space between Orin and Iri."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Orin's account"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin had been the first Keeper of Witness. They had believed that listening was the gentlest duty. They had believed that every story deserved a room. When the Quiet began to gather, Orin tried to hear every missing voice. They stayed in the observatory. They listened through the night. They opened the archive. They read every page. They carried every name. At first, the Lumen grew brighter. Then it became too full. It held memories that had not been freely given. It held names that people had asked to release. It held the silence of people who had no wish to speak. Orin tried to separate the memories. They could not. The Quiet gathered around the overflow. Orin called the five wardens. They divided the Lumen. The notes survived. The Quiet remained. Orin chose to bind it at the centre of Moonwake. They gave up their name so the Quiet could not use it as a path into the living. They thought the sacrifice would end the danger. It did not. The Quiet became a room with no door. Orin became its keeper. The city disappeared. The wardens continued to guard their notes. The world forgot the promise that had joined them. Orin had saved the world from immediate collapse. They had also made themselves the only person who could hear the Quiet. The burden grew heavier. The longer Orin carried it, the more they believed that no one else should be asked. The final mistake was not the division of the Lumen. It was the refusal to share the listening. The Wayfarer understood. They asked whether Orin wanted help. Orin answered, \"I do not know how to ask.\" Iri stepped forward. \"Then we can begin by staying.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The fifth note — Witness"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Lumen brightened. The Quiet moved through the room. It appeared as voices. A voice asked for a name. Another asked for silence. Another asked for a witness. Another said that it was not ready. The Wayfarer listened. They did not answer every voice. They did not promise to remember everything. They did not tell the Quiet to disappear. They asked whether it wanted a place. The voices became quieter. Orin looked at the Wayfarer. The fifth note appeared. Witness. It was a small white light. It did not belong to Orin. It did not belong to Iri. It did not belong to the Wayfarer. It rested between them. The light entered the Lumen. The five notes returned to harmony. The Quiet did not vanish. It became possible to hear. Orin's name returned. It was not forced from the past. It arrived as a choice. Orin spoke it aloud. \"I am Orin.\" The room opened. The Lumen was whole. The night became brighter. But the light did not ask for a Keeper. It asked for a decision."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 5 — The last battle"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The First Keeper"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin raised their hands. The Moonheart shifted. A crescent of light crossed the floor. The Wayfarer moved. The crescent passed. A pause followed. Then an echo appeared behind the Wayfarer. Orin's pattern repeated. The Wayfarer watched the signs. They understood that Orin was not trying to destroy them. Orin was testing whether the notes had been understood. The first phase was a slow crescent. The second phase was the echo. The third phase was an inward pulse. The Wayfarer moved between them. They used the movement arts learned across the kingdoms. Moon Dash crossed the first lane. Wall-Jump found a foothold beside the broken wall. Double-Jump cleared the falling light. Star Grapple crossed the final gap. The Wayfarer approached Orin. They struck the lantern against the floor. The five notes answered. Orin's shield broke. The guardian fell to one knee. The Wayfarer did not strike again. Orin looked up. \"Why did you stop?\" \"Because you are not the Quiet.\" Orin closed their eyes. The battle ended. The Wayfarer offered a hand. Orin accepted. The First Keeper stood. The Lumen glowed. The fifth note rested in the centre. The world had been returned to itself. It had not been returned to the past."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The question after the battle"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri stood beside Orin. For a long time, neither spoke. Then Orin said, \"I should have asked you.\" Iri answered, \"Yes.\" \"I thought I was protecting you.\" \"I know.\" \"I did not understand what the choice cost.\" \"I know.\" \"Will you forgive me?\" Iri looked at the lantern. \"I do not know yet.\" Orin nodded. \"That is fair.\" The Wayfarer asked what should happen next. Orin looked at the Lumen. The light could be returned to the kingdoms. It could remain beneath the observatory. It could be released into the sky. No single choice would restore every lost year. No choice would erase the pain caused by the Keepers. The Lumen could not decide. It had never been meant to. The Wayfarer would choose."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 6 — The three futures"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Shared Light"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The first future returned the notes to the people. The Lumen opened. Its light travelled through the kingdoms. Mosslight received Return. Ember Hollow received Hearth. Frostglass received Name. The Astral Archive received Distance. The Quiet Beyond received Witness. The notes did not become objects that could be owned. They became practices that could be shared. The Wayfarer refused the empty throne. Iri refused to become the next Keeper. Orin refused to become the only listener. Each kingdom chose a circle of people to tend its note. The circle could change. A person could leave. A person could return. The light continued. No single person had to carry it. The observatory became a place for meetings. Its doors remained open. The old archive was not rebuilt as it had been. It became a garden of stories freely offered. Some pages remained blank. The blank pages were treated as part of the collection. The Shared Light was not a perfect ending. People still forgot. People still disagreed. People still left. But no one was required to preserve another person against their will. The Lumen remembered without owning. The Quiet could be heard without becoming a prison. The moon rose over a world that could share its light."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Quiet Keeper"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The second future kept the Lumen beneath Moonwake. The Quiet remained beyond the threshold. It was not sealed away from the world. It was given a place to be heard. Orin, Iri, and the Wayfarer formed a circle with the five kingdoms. Each kingdom sent a listener. No listener held the duty forever. The circle met beneath the observatory. It recorded only what people chose to share. It kept no secret catalogue. It made no person prove that their story mattered. The Quiet was approached slowly. Some voices were ready. Some were not. Some never wished to speak. The circle respected that. Orin taught the old watch how to listen. Iri taught them how to leave a page blank. The Wayfarer taught them to ask before carrying a memory. The Quiet remained powerful. It did not become a villain. It became a responsibility shared by people who could step away and rest. The Quiet Keeper was not a throne. It was a practice. The observatory kept its vigil. The door remained open. The keeper was never alone."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Open Sky"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The third future released the Lumen. The five notes rose above the observatory. They moved through the sky. The light became a new moon. It was visible beneath the deepest roots. It did not remember every name. It remembered the spaces where people had chosen to speak. The old Moonwake began to loosen. Its towers became silver dust. Its streets became paths of light. The observatory did not return. It became the first place in a new constellation. Orin walked into the morning without a title. Iri followed the moth-lights beyond the map. The Wayfarer crossed the first open road. Every kingdom raised a small roof. The roofs were open to the sky. People gathered beneath them. They told stories. They left some stories unfinished. They chose new names. They changed old promises. They made room for travellers. The new moon did not belong to anyone. The old Keepers would not be needed. The Open Sky was not an escape from responsibility. It was a decision to let the world grow beyond the old arrangement. No single light watched over every home. Every window became one."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 7 — The Underlight"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The road beneath the first map"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Underlight was a secret room beneath the observatory. It could be reached only after the five hidden marks had been found. The path began beneath the first gate. It descended through roots older than Moonwake. The walls held pieces of every kingdom. A green leaf. An amber cup. A blue mirror. A violet star. A quiet stone. The Wayfarer entered. The room was not part of the original Lumen. It was a space left by the wardens when they divided the five notes. The sixth note had never been created. It had never been guarded. It was called the Margin. The Margin was not light. It was the space where something new could begin. The Unwritten Warden stood at the centre. It was made from empty pages and pale stone. It did not have a face. It carried a small outline where a name might be written. It raised one hand. A platform disappeared. Then it returned in a new place. The Wayfarer watched. The room was changing to test whether they would insist on the old map. The Wayfarer moved. They used the five movement arts. The Warden erased one path. The Wayfarer found another. The Warden restored the room. The Wayfarer crossed it. At last, the guardian lowered its hand. It spoke without a voice. The Wayfarer understood. \"The margin is not an ending.\" \"It is permission for another page.\" The hidden guardian was defeated. It did not die. It dissolved into blank paper. The paper drifted into the lantern. The lantern did not gain another note. It gained an empty space beside the five. The sixth place remained open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Underlight's revelation"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Underlight revealed that the Wayfarer was not an heir. They were not secretly Orin's child. They were not a fragment of Auralis. They were not the reincarnation of a forgotten warden. They were not chosen by a prophecy. The Lumen had left a margin when it divided. The margin was a place for a future voice. The Wayfarer entered that space because they were present. Their story mattered because they chose to listen. The world did not require them to become a new keeper. It required them to decide what kind of world should follow. The Unwritten Warden had guarded the margin by keeping it empty. It had mistaken emptiness for safety. The Wayfarer showed it that a blank page could be used. The margin could hold a new story without owning it. The secret room was not a path to greater power. It was a reminder that every ending could leave room for another beginning."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The final conversation beneath the observatory"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"The page must remain blank.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Why?\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"So no one can claim it.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"A blank page can still be used.\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then someone may write the wrong thing.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"They may.\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then what protects the page?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"The right to change it.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"And the right to leave it blank.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"And the right to close the book.\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"Who will guard the margin?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"No one alone.\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"What becomes of the blank?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Room.\" "
          },
          {
            "text": "Unwritten Warden:",
            "emphasis": "strong"
          },
          {
            "text": " \"For whom?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Whoever comes next.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Chapter 8 — The final page"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "After the choice"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer returned to Moonwake. The observatory was no longer asleep. Its windows held a soft light. The old chart remained on the table. The five notes were not drawn as circles. They were drawn as open paths. Iri stood beside the doorway. Orin sat near the window. The Wayfarer placed the lantern between them. No one asked who should keep it. The Lumen shone. The Quiet could be heard beyond the room. It was no longer pressing against a locked door. It had a place. The five kingdoms sent letters. Pell wrote about the bell garden. Vey wrote about the public hearths. Edda wrote about the private room. Nym sent a map with a blank circle. The Wayfarer read every letter. They did not add them to a permanent catalogue. They placed them on the table. Anyone who wished could read them. Anyone who wished could leave. The observatory became a place for listening. It was not a throne. It was not a prison. It was a room with a door."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Auralis and Orin"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "One evening, Iri stood on the observatory steps. Orin joined her. They watched the moon. Orin said, \"I remember your name.\" Iri answered, \"I remember it too.\" \"I should have asked you to stay.\" \"You should have asked.\" \"I thought the archive would protect you.\" \"It protected a record of me.\" Orin lowered their head. Iri continued. \"I do not know whether I forgive you.\" Orin nodded. \"You do not owe me that.\" \"I know.\" They stood together. The silence was not complete. The moonlight moved across the steps. Iri asked what Orin wanted now. Orin answered, \"To learn how to be a person again.\" Iri said, \"Then begin with breakfast.\" Orin laughed. It was an unfamiliar sound. It was enough."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Wayfarer's road"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer did not become Keeper. They did not become a warden. They did not take the lantern as a crown. They kept travelling. Sometimes they returned to Mosslight. Sometimes they sat beside Vey's hearth. Sometimes they helped Edda sort the pages that had been offered freely. Sometimes they crossed the Archive with Nym. Sometimes they listened to the Quiet. Sometimes they closed the lantern and rested. The Wayfarer learned that a story could end without a person becoming a monument. They learned that a journey could be complete without making the world still. They learned that a promise could remain kind by allowing itself to change. The road remained open. The story did not require a sequel. It allowed one."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The Quiet Beyond Chronicle — Recovered pages"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Unlit Threshold"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The threshold was a doorway with no wall. It appeared only when a traveller stopped trying to find it. The Wayfarer first saw it in the reflection of the lantern. It marked the place where memory became a choice."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Hushwater Hall"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The hall was made of dark water and pale stone. It reflected rooms from the other kingdoms. The water did not reveal what a person had forgotten. It showed that a room could remain even when no one was ready to enter it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Pale Fracture"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The fracture was a line of light across the floor. It marked the place where the Lumen had been divided. The line was not a wound that had to be closed. It was a record of a choice made under pressure."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Nullstone Gallery"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The gallery held stones with no names. Each stone had been placed by someone who wished to remember without speaking. The stones were not anonymous. They were private."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Unmaking Steps"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The steps descended toward rooms that had not yet appeared. They could not be mapped. They changed when someone stopped. A traveller had to move at their own pace."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Echoes Without Names"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The room held voices without labels. No voice was assigned to a face. No face was assigned to a history. The echoes were allowed to remain incomplete."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Dusk Engine"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The engine moved slowly. It did not create light. It changed the distance between memories. It allowed a person to approach a story without being pulled inside it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Hollow Meridian"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The meridian divided the room into two halves. One half held the things that had been remembered. The other held the things that had been released. A doorway connected them."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Veil Between"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The veil was made from a thousand small silences. It did not block sound. It softened it. A traveller could pass through without carrying every voice."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Quiet Labyrinth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The labyrinth had no fixed route. It opened when a traveller admitted that they were uncertain. It closed when a traveller demanded that every door lead to the same answer."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Ash of Memory"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ash was gathered from the old archive. It contained no readable names. It was used to warm the soil around the observatory. The past had become part of the ground."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Last Reflection"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The reflection showed a person who had not arrived yet. The room did not explain who they were. It left the future alone."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Nameless Archive"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The archive held no public catalogue. Its shelves were empty until someone chose to leave a memory. Its doors were never locked."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Black Horizon"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The horizon was dark because the stars were behind the traveller. Turning around revealed them. The room taught that a direction could be changed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Final Ring"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The ring held the five notes in balance. It did not make them identical. It allowed their differences to remain visible."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Beyond the Silence"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Beyond the silence was not another world. It was the world with room to speak. The Wayfarer stepped into it. The story continued because someone was free to begin."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Dialogue folio — Orin, Iri, and the Wayfarer"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"I thought I could carry the Quiet.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"You carried it alone.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"I did not know another way.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"There was another way.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"I know that now.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"What do you hear?\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"People who have not found a room.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then we can make one.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if they do not wish to enter?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"The door can remain open.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if they never come?\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then the room can rest.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"What if I forget again?\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"We can remind one another.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"And we can ask before we carry.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"I remember my name.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"Then say it.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"Orin.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"Welcome back.\" "
          },
          {
            "text": "Orin:",
            "emphasis": "strong"
          },
          {
            "text": " \"I am not the person I was.\" "
          },
          {
            "text": "Iri:",
            "emphasis": "strong"
          },
          {
            "text": " \"No one is.\" "
          },
          {
            "text": "Wayfarer:",
            "emphasis": "strong"
          },
          {
            "text": " \"That does not make the story less true.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "Character page — Orin, the First Keeper"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin was the first Keeper of Witness. They believed that listening could hold a world together. They were patient. They were curious. They were slow to speak. They often left a conversation without writing anything down. The other Keepers sometimes thought this was careless. Orin knew that a person could be heard without being recorded. When the Lumen began to overflow, Orin tried to listen to every missing voice. They believed that if they could understand the Quiet, they could end it. They gave up their name to bind the silence. They did not tell the wardens what the sacrifice would cost. They did not ask Auralis whether she wished to share the burden. They believed that taking the pain alone was an act of love. It was also a form of control. Orin's long vigil made them forget that the living could choose. They began to think of the world as something that needed to be protected from itself. The Wayfarer did not absolve Orin. They gave Orin a chance to ask for help. The First Keeper returned as a person, not a title. They had to learn how to sit. They had to learn how to eat. They had to learn how to hear a story and let it remain unfinished. They had to accept that forgiveness could not be demanded. Their repair was ordinary. It took time. It remained incomplete in some places. That made it honest."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Orin speaks"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "\"I was the first to listen.\" \"I thought listening meant carrying.\" \"I thought carrying meant never setting down.\" \"I thought a keeper had to remain.\" \"I did not ask the people what they needed.\" \"I did not ask Auralis what she wanted.\" \"I did not ask the wardens whether they could share the burden.\" \"I divided the light.\" \"I kept the silence.\" \"I called it protection.\" \"I was wrong.\" \"The world did not need a perfect keeper.\" \"It needed a room.\" \"It needed a door.\" \"It needed people who could leave and return.\" \"I am Orin.\" \"I can begin again.\""
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "The fifth note — Witness"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Witness is not surveillance. Witness is not ownership. Witness is not the demand that every story be told. Witness is the act of seeing another person without taking their story away. It is the courage to remain present without deciding what the other person must become. It is the practice of asking before remembering on someone's behalf. It is the patience to hear an unfinished sentence. It is the humility to accept that some memories are not yours. It is the discipline to let a person leave. It is the kindness of leaving a light on without insisting that someone return. Witness completes the five notes. It does not complete every life. It makes room for the next voice."
          }
        ]
      }
    ]
  },
  {
    "id": "afterstories",
    "title": "Companions, Creatures, and Afterstories",
    "subtitle": "Character folios, side stories, bestiary, and epilogues.",
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "runs": [
          {
            "text": "The Moonwake Testament"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "This volume deepens the people and small lives encountered across the five acts. It is supplementary canon: these stories enrich the journey without changing its established route. The creatures are not all enemies. The companions are not rewards. The bestiary is a record of how to understand a living thing, not merely how to defeat it."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "I. The people who kept walking"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Auralis, who became Iri"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Auralis grew up beneath the western dome of Moonwake. Her family repaired small things that other people thought were too ordinary to save. They mended cracked cups. They replaced loose hinges. They returned lost buttons to the coat that had dropped them. Auralis learned that a home was made from small acts repeated with care. She became an archivist because she loved the ordinary detail of a life. She catalogued street cats, rain patterns, festival songs, and the names people chose for their gardens. She did not believe that every memory belonged in a book. She believed a book could help someone find a memory they had chosen to keep. When the Quiet began to gather, Auralis noticed that the archive had become a map. The Quiet travelled along names that had been recorded without permission. She removed her own name from the public catalogue. She placed it in the lantern because the lantern could remember without displaying. The act saved the archive for a time. It also left her unsure how to introduce herself. The name Iri became a small shelter. The name Auralis remained a room she could enter when ready. Across the journey, she learns that she is allowed to keep both. Her final growth is not the recovery of a lost identity. It is the freedom to decide how that identity is carried. After the ending, she tends the observatory as a place of welcome. She no longer records every arrival. She asks whether a visitor wishes to leave anything behind. Some leave a name. Some leave a drawing. Some leave nothing. The door stays open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Vey, who kept a place by the fire"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Vey was taught to work metal by a person whose face he no longer remembers. He remembers the teacher's hands. They warmed every tool before passing it to another worker. They never made a tired apprentice lift a hot piece alone. Vey learned that craftsmanship was not only the shape of an object. It was the shape of the care that surrounded its making. He became an ash-smith. He learned how to distribute heat through the city. He learned that a furnace could keep a district warm while a small hearth kept one person from feeling alone. When Orin visited Ember Hollow, Vey promised to keep a place for anyone who arrived without a name. He did not know whether Orin would ever return. He did not know whether the guest would be one person. He kept the place anyway. His story is not about waiting forever. It is about learning that a promise can be renewed by the people who live beside it. After the Sovereign rests, Vey teaches the Quiet Flame to new apprentices. He makes no apprentice work alone. He keeps the empty chair by the hearth, but it is no longer reserved for a ghost. It is offered to whoever needs it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Edda, who chose a name"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Edda began as a reader of old inscriptions. She could recognise a name by the pressure of its letters. She believed that preserving a name was a form of protection. When the Quiet reached Frostglass, she copied every name she could find. She did not want another person to disappear without a trace. The work became her life. The library became her whole world. She forgot that a name was carried by a living person. She forgot that a person could change their name without becoming false. She forgot that privacy was not the same as erasure. The Hollow Monarch gave shape to her fear. Its shelves were perfect. Its people were still. Edda's choice to use a name she had chosen was the first change in the library's law. She did not destroy the old page. She placed it somewhere private. She did not demand that the new name be permanent. She kept it in the open. After the story, Edda teaches people how to revise their records. She makes it possible to remove a public entry without destroying a private memory. She writes one sentence at the entrance. \"Your name is yours before it is ours.\""
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Nym, who learned to travel"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym was the youngest cartographer in the Astral Archive when the observatories first began to move. They were fascinated by routes. They believed every place could be reached if the map was accurate enough. They were travelling with a friend when a bridge shifted. Nym looked down to finish a measurement. The friend crossed without them. Nym never learned whether the friend arrived. They began drawing safer bridges. They drew more accurate routes. They drew the same route again and again. The map became a substitute for the journey. Nym's grief turned into a rule: a map should never leave a traveller uncertain. The rule could not be kept. The Astral Warden reinforced it. The Wayfarer gave Nym permission to leave a room blank. Nym discovers that uncertainty can be honest. They no longer promise that every route is safe. They promise to mark what they know and leave room for what they do not. After the ending, Nym travels between the five kingdoms. They draw maps that can be changed. They include routes people choose not to take. They leave blank spaces for future travellers. Their new atlas is never complete. That is why it remains useful."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Orin, who learned to be one person again"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Orin was not born to be the First Keeper. They became a listener because they were willing to wait. People trusted them with unfinished stories. Orin learned that a silence could be a request rather than an absence. When the Lumen began to overflow, Orin tried to carry every voice. They believed that a Keeper should be able to hold what others could not. They did not ask the five wardens to share the work. They did not ask Auralis whether she wanted to take the risk. They divided the Lumen and bound the Quiet. The choice saved the kingdoms from immediate collapse. It also made Orin the only person allowed to hear the silence. Their long vigil became a form of control. They believed that if they stopped, the world would fall. The Wayfarer shows them that protection without consent can become another kind of silence. Orin's return is not an instant apology accepted by everyone. Iri is allowed to remain uncertain. The kingdoms are allowed to decide how much trust they offer. Orin learns to help without becoming the centre. After the ending, Orin cooks badly. They learn to mend a chair. They learn to sleep through a whole night. They listen when someone asks them to stop. They are no longer a title. They are a person with time to live."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Wayfarer, who was not chosen"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Wayfarer is deliberately not given a fixed name or a secret royal history. They arrive beneath the observatory because the story has reached a place where another voice is possible. The Lumen does not select them as a perfect person. It does not know whether they are brave. It does not know whether they will make every choice well. It simply leaves room. The Wayfarer becomes important by choosing to listen. They do not solve every problem with a strike. They learn to pause before approaching a guarded thing. They learn to leave an unfinished memory alone. They learn that a route may be open without being compulsory. They learn that an ending is a choice, not a reward. After the final chapter, the Wayfarer continues travelling. They may return to every kingdom. They may stay away for a time. The story does not punish them for resting. The lantern remains a companion, not a command."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "II. The small people of the kingdoms"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Pell, gardener of the bell flowers"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Pell tends the Bell Garden. He remembers the person who taught him to let a flower finish opening. He does not remember their name. He keeps the page blank because that was the request. He knows the garden has done its work when a visitor leaves with more room than they arrived with. After the first note returns, Pell makes the garden easier to cross. He removes the thorn barriers that were only there to frighten travellers. He leaves the old warning bell in the earth. He does not ring it for festivals. It is still a warning. He teaches younger gardeners that a warning is not a command. It is information offered in time to choose."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Sella, guest at the open hearth"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Sella arrives at Vey's stall on a cold evening. She has no coat suitable for the mountain wind. She has no money for a room. She does have a small paper star. She places it beside the empty cup. Vey asks whether she wishes to sit. She says yes. He does not ask where she came from. She warms her hands. The paper star dries beside the flame. Later, Sella returns with a second cup. She places it beside the first. The promise has become a custom. The city learns that an open seat can be used without being claimed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The bridge workers"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The bridge workers maintain Slag Bridge. They disagree about the best way to repair a chain. They argue loudly. They share tools. They stop when someone is tired. One worker paints a small line on the wall where the mountain cracked. Another paints a second line beside it. The lines show where the repair begins and ends. The Wayfarer sees that the bridge is safer because the workers can admit what is broken."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The frost readers"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The frost readers help people revise their names in the library. They do not write a name unless the person asks. They never ask why someone changed a name. They keep the private room warm. They make certain that the mirror can be covered. They teach the younger archivists that a record is useful only while it serves the person it describes."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The letter-carriers of the Archive"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The letter-carriers travel between observatories. They carry letters without reading them. They carry maps without deciding the destination. They carry blank paper as often as sealed envelopes. They do not promise that every letter will arrive. They promise to tell the sender when a route changes. Their work helps Nym understand that a map can guide without controlling."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "III. Bestiary folios — Creatures of the living realms"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Mossling"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A mossling is a small root-creature that protects young growth. It circles a stranger before deciding whether to approach. Its spring is a warning, not a hunt. If the visitor steps back, the mossling often settles. It likes damp soil and quiet shade. Its back grows moss that changes colour with the season. The best way to pass a mossling is to let it choose the distance."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Thorn Sprite"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A thorn sprite guards fragile pages and young branches. It flashes before diving. The flash marks the direction of its movement. It is attracted to hands that reach too quickly. It is calmed by patience and a lantern held low. It does not understand ownership. It understands care."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Cinder Wisp"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A cinder wisp lives near warm stone. It circles twice before dropping a harmless but startling wave of heat. It is drawn to places where fires are unattended. It becomes calmer when the fire is shared. Its glow is brightest just before dawn in Ember Hollow."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Ash Hound"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "An ash hound patrols damaged bridges and furnace vents. It leaves a trail of warm cinders. It lowers its head before a straight lunge. It is more concerned with the broken object than the traveller. If the object is repaired, the hound often leaves. It keeps a den beneath the Slag Bridge."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Frost Echo"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A frost echo repeats the last movement it sees. It disappears in a cold shimmer and reappears behind the previous position. It does not understand that the world has changed. It follows the image rather than the person. It is safest to move after the shimmer, not toward it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Glacier Warden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A glacier warden protects the supports of the Glass Causeway. It raises a shield before sending a low wave along the ice. The shield is a warning sign. The warden does not want the bridge to collapse. Its strongest instinct is to keep the crossing open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Star Construct"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A star construct draws a line before releasing a pulse. The line marks the area it intends to cross. It is built to maintain observatory routes. It does not pursue a traveller beyond its assigned orbit. A changed route can confuse it. A new chart can teach it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Astral Drake"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "An astral drake follows old flight paths. It folds its wings before diving toward the place where a traveller stood. It is not malicious. It is following a route that no longer fits the room. It can be redirected by a new star chart."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Quietling"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A quietling gathers where many voices have been left unheard. It dims and reappears at a distance. Its wave is slow. It does not chase someone who waits. A quietling often leaves a small stone that holds a sound without a name."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "Eclipse Shade"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "An eclipse shade repeats a delayed movement. It leaves an echo where it intends to move next. It can be avoided by watching the mark rather than the creature. It appears in Echo Court where memories have been carried without a witness."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Unwritten Warden"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Unwritten Warden guards the margin beneath Moonwake. It changes platforms and paths to test whether a traveller believes the old map must remain fixed. It has no face because it has no assigned identity. It is not a final enemy. It is the keeper of the space where the next story may begin."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "IV. Six companion threads — The longer versions"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Unlit Lantern"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri's first thread begins in the observatory. The lantern is familiar, but its purpose is not. The Wayfarer can trust Iri with it or keep it close. Either choice is respected. The thread asks whether trust must be proven by surrendering control. The answer is no. Trust grows when both people can say what they need."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Bell Kept Quiet"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The Bell Garden's warning has been held beneath the roots. The Wayfarer can let the roots finish the sentence or carry the bell's note forward. Both choices preserve the warning. One leaves it with the forest. The other carries it into the next kingdom. Pell explains that a warning remains useful only while someone can hear it."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "A Hearth for Two"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Vey's empty seat is a promise to an unknown guest. The Wayfarer can keep it open or return the ember to the city. Keeping it open teaches the city to welcome someone it cannot predict. Returning it teaches the city to share the warmth more widely. The empty place is not wasted in either path. It has become a custom rather than a shrine."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Name Without Ink"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Edda's old name is kept in a private drawer. The Wayfarer can speak her chosen name with her or let her decide when to remember. The thread is not about recovering a perfect past. It is about permission. Edda becomes more confident when the library stops demanding a single answer."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The Blank Constellation"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym's final star is deliberately unmarked. The Wayfarer can leave it blank or draw a route for another traveller. The first choice honours uncertainty. The second choice offers guidance without pretending to guarantee an outcome. Nym learns that an unfinished map can be complete enough to use."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "A Name for the Light"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Iri remembers Auralis. The Wayfarer can tell her the name or ask her to choose. The first choice shares a recovered truth. The second gives Iri ownership of the decision. She keeps both names. The lantern holds the sound without demanding that she choose one forever."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "V. Small side stories that can be found between rooms"
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The cup that waited in Ember Hollow"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A cup was left on a windowsill for a traveller who never arrived. The cup was repaired three times. No one knew whether the traveller was alive. The household kept the cup because the promise was not a demand. One winter, a child borrowed it. The child returned it clean. The household made another cup. The window remained open."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The page that Edda did not read"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A page arrived at the Name Library with no writing. Edda almost catalogued it as empty. Then she noticed a faint pressure where a hand had rested. She placed it in the private room. No one asked to read it. Years later, the page was returned to the person who had left it. The person smiled. They did not explain."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The star that Nym removed"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "Nym once removed a star from the atlas because it no longer matched its recorded position. The star had moved. The atlas had not. Nym thought the star was wrong. After the Warden's release, Nym placed the star back. They drew a new line. The old map remained as a record of how the sky had changed."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The lantern-moth's return"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A lantern-moth left the observatory and travelled through all five kingdoms. It rested beside Pell's bell. It warmed its wings near Vey's hearth. It landed on Edda's private mirror. It followed Nym's moving atlas. At last it returned to Iri. The moth did not carry a message. Its journey was the message."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The repaired bridge"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "A bridge worker painted a line across a repaired chain. A second worker painted a line beside it. A third worker added a small star. The marks showed where the bridge had once broken. The workers refused to cover them. They wanted travellers to know that the bridge was maintained, not perfect. The bridge became safer because its repairs remained visible."
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "runs": [
          {
            "text": "The name on the door"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "After the ending, a new door appeared in the observatory. No one knew who had built it. It had a small plate beside the handle. The plate was blank. Visitors could write a name. They could also leave it untouched. The door was never locked."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "heading",
        "level": 2,
        "runs": [
          {
            "text": "VI. The companions after the ending"
          }
        ]
      },
      {
        "type": "paragraph",
        "runs": [
          {
            "text": "The companions do not stop living when the Lumen is restored. Iri keeps the observatory lantern in the front window and welcomes visitors without recording their names. Vey teaches a new circle of ash-smiths to build smaller fires and leave time for rest. Edda makes the Name Library a place where every person controls their own record. Nym publishes a movable atlas with routes that can be revised and blank spaces that remain intentional. Orin learns ordinary work again: cooking, repairing chairs, listening, apologising, and sleeping through the night. The Wayfarer continues beyond the five kingdoms, carrying the lantern as a companion rather than a command. Some evenings they return to the observatory. Some evenings they do not. The road remains open either way."
          }
        ]
      }
    ]
  }
]
