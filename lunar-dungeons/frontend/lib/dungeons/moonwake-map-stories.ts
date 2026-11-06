import { MOONWAKE_VOLUMES, type MoonwakeVolume, type MoonwakeStoryBlock } from "./moonwake-story"

const heading = (level: 1 | 2 | 3, text: string): MoonwakeStoryBlock => ({
  type: "heading",
  level,
  runs: [{ text }],
})
const paragraph = (text: string): MoonwakeStoryBlock => ({ type: "paragraph", runs: [{ text }] })
const quotation = (text: string): MoonwakeStoryBlock => ({ type: "quote", runs: [{ text }] })
const divider: MoonwakeStoryBlock = { type: "divider" }

/**
 * Optional map chapters are placed between the five main acts.
 * Their room IDs and lore IDs are also used by the playable world.
 */
export const MOONWAKE_MAP_VOLUMES: MoonwakeVolume[] = [
  {
    id: "interlude-mosslight",
    title: "The Orchard of Unsent Letters",
    subtitle: "Mosslight Wilds · The first impossible memory",
    blocks: [
      heading(1, "The Orchard of Unsent Letters"),
      paragraph("The side door in the Root Archive had no handle. It was made of two roots grown together, and between them a narrow line of pale light trembled like a word someone had almost said. The Wayfarer pressed the lantern against it. Somewhere beyond the wood, a bell rang twice. Iri went very still."),
      paragraph("“That is not the Bell Garden,” she said. “The bell there has only one voice.”"),
      paragraph("The roots loosened. Behind them lay an orchard growing underground, its branches threaded through a ceiling of black soil. Each tree bore paper leaves. They did not rustle when the air moved; they rustled when someone remembered something. On the nearest branch hung a small envelope addressed in the Wayfarer's handwriting. The ink was dry. The date was tomorrow."),
      heading(2, "A letter from a day that has not happened"),
      paragraph("Iri asked the Wayfarer not to open it. She said this softly, with the careful kindness of someone who had once begged herself to do the same thing. But the envelope already knew their touch. Its seal broke without a sound, and inside was a single sentence: You promised you would come back after the second bell."),
      paragraph("The sentence was familiar in the way a room can be familiar in a dream. The Wayfarer had never seen the orchard, never heard the second bell, and could not remember making any promise. Yet the lantern warmed. The paper smelled faintly of rain. Iri turned away and wiped her cheek with the heel of her hand."),
      quotation("Some memories arrive before the moment that gives them a name."),
      paragraph("At the end of the orchard stood five small trees, each planted in a ring of white stones. The first carried the name of the Bell Garden. The second was marked with the outline of a hearth. The third held a blue ribbon. The fourth had a brass star tied to its trunk. The fifth was bare. A sixth space had been carefully left between them, not large enough for a tree, but large enough for a person to stand."),
      paragraph("The Wayfarer counted the rings. There were six. Iri counted them too, then counted again. Her lips moved without sound. She knew the orchard. She knew the empty space. What frightened her was not that she remembered it, but that she remembered leaving it with someone who had not yet arrived."),
      heading(2, "The first copy"),
      paragraph("A narrow table stood beneath the bare tree. On it lay a ledger with two columns: WHAT HAPPENED and WHAT WE TOLD OURSELVES HAPPENED. The first column was almost empty. The second was full of handwriting. Some lines had been crossed out so gently that the paper had not torn. Others had been written over and over until the page looked bruised with ink."),
      paragraph("The oldest entry was signed by Orin and Auralis. It described an experiment in keeping a memory safe by placing it in every kingdom at once. The experiment had worked for one night. At dawn, the memory returned with its words in the wrong order. The people who heard it began to remember a goodbye that nobody had spoken."),
      paragraph("Auralis had written a note beneath the entry: A memory is not a seed if we do not let it grow. A copy can preserve the shape of a voice, but it cannot carry the life that made the voice. Do not mistake the echo for the person."),
      paragraph("Iri read the note twice. The second time she read it, she cried—not loudly, and not because the words were cruel. She cried because she recognised her own handwriting in the final letter of Auralis's name. For a moment she seemed to be standing in two places: beside the Wayfarer, and in a past she had spent years insisting she could not remember."),
      heading(2, "What the roots kept"),
      paragraph("The orchard had not predicted the future. It had preserved a rehearsal. Before the Lumen was divided, Orin and Auralis had tried to rehearse a return: five witnesses, one memory, and a place left open for the person who would one day decide whether the story should continue. The Quiet had copied the rehearsal because no one had been allowed to finish it."),
      paragraph("The letter was not written by the Wayfarer. It was written by the Lumen in the shape of a promise it hoped someone might choose. That difference mattered. A promise imposed by a memory was a chain. A promise freely made in the present could become a path."),
      paragraph("Iri folded the letter along its old crease and placed it back in the envelope. “I cannot promise that I will remember everything,” she said. “But I can promise not to pretend that I do.” The lantern brightened, and one paper leaf turned green. It did not become a record of the past. It became a living leaf, trembling in a room that had never before allowed anything to change."),
      quotation("The first kindness was not remembering perfectly. It was telling the truth about what had been lost."),
      divider,
      heading(2, "The orchard's final page"),
      paragraph("When the Wayfarer returned to the Root Archive, the side door remained open. The letter had vanished from the lantern's light, but its sentence remained in the Chronicle as a question rather than an instruction. The second bell had not rung yet. Nothing in the orchard demanded that it should."),
      paragraph("Far below the roots, a voice spoke in Orin's cadence: “If the first return fails, do not call the next one a mistake.” Iri heard it too. This time she did not turn away. She stood beside the Wayfarer until the voice had finished, and then they left together.")
    ],
  },
  {
    id: "interlude-ember",
    title: "The Foundry of Borrowed Voices",
    subtitle: "Ember Hollow · The promise beneath the promise",
    blocks: [
      heading(1, "The Foundry of Borrowed Voices"),
      paragraph("The door was hidden behind the Slag Bridge's oldest support, where the cooled river of fire made a black glass wall. Vey had warned the Wayfarer that some furnaces were built to melt iron and others were built to melt the memory of iron. He had not mentioned a third kind: a furnace that could reproduce a voice so perfectly that the listener forgot to ask who had spoken."),
      paragraph("Inside, copper pipes carried a low, warm hum through the stone. Each pipe ended at a little brass mouth. Some whispered lullabies. Some recited recipes. One repeated a name that had been crossed out of every public ledger. At the room's centre stood an empty chair facing a cold hearth."),
      heading(2, "The voice in the copper"),
      paragraph("When Vey entered, the pipes began to sing. It was a small tune with a rising note at the end, the sort of melody a person hums while waiting for someone to come home. Vey set down his tools. He knew the tune, though he had never taught it to anyone. His hands began to shake."),
      paragraph("A voice came through the largest pipe. “You kept the chair.” It sounded like Orin. It sounded like the Orin Vey remembered from the old observatory, before the name disappeared and the promise became a duty. The voice said, “You kept it for me.”"),
      paragraph("Vey almost answered. Then he noticed the pipe's surface. The copper was covered in tiny scratches, each one made by a different hand. The voice had not come from a person at the other end. It had been assembled from thousands of small recordings: greetings, farewells, requests for shelter, and the words people had swallowed because they did not want to trouble anyone."),
      quotation("A voice can sound familiar and still have no right to speak for the person it resembles."),
      paragraph("“That is not him,” Vey said. He did not say it angrily. He said it with the tired gentleness of someone putting down a weight he had mistaken for a promise. The pipe tried again, this time with Vey's own voice: “Please do not leave the chair empty.”"),
      heading(2, "The account of warmth"),
      paragraph("A ledger was built into the hearthstone. It recorded every memory offered to Ember Hollow's public fires. The entries were voluntary at first: a childhood song to warm a winter room, the taste of a first harvest to keep a traveller from freezing, a grandmother's recipe to help a neighbour feel less alone. Later, when the Quiet began to spread, people started giving memories because they feared that if they kept them, someone else would disappear."),
      paragraph("The Ember Sovereign had not ordered this. It had watched the offerings become compulsory in the minds of frightened people and had tried to carry the excess alone. Its furnace grew brighter while its own history grew smaller. Vey had believed the Sovereign was stealing the city's memories. The ledger revealed a harder truth: the city had mistaken sacrifice for love, and the Sovereign had mistaken silence for consent."),
      paragraph("Vey found his own first entry. It was not a name or a face. It was the memory of a warm room and a person who had sat across from him, listening without asking him to become useful. The memory ended before the person's face appeared. Beneath it Auralis had written: The gift is not the memory. The gift is the room in which it can be shared."),
      paragraph("Vey lowered himself into the empty chair. He had kept it for so long that he had forgotten chairs were made for sitting, not guarding. He cried then, quietly and without embarrassment. Not because the room had returned the person he missed, but because it had shown him the promise beneath his promise: he had wanted no one to wait alone."),
      heading(2, "The fire that does not consume"),
      paragraph("The Wayfarer opened the furnace vents. Instead of feeding it another memory, Vey placed a piece of ordinary coal inside. It was small, unremarkable, and had no name attached to it. The fire took it and burned with a steady light. The pipes fell silent, one by one, until the room held only the sound of a real flame."),
      paragraph("The foundry's mechanism had been designed to reproduce whatever a person most wanted to hear. The Quiet used it because grief makes a perfect listening room: the heart supplies the missing words, and the echo supplies the familiar voice. The room had not discovered Orin's secret. It had discovered Vey's longing and returned it wearing Orin's shape."),
      paragraph("Vey dismantled the brass mouths but kept the ledger. He changed its heading from WHAT WAS GIVEN to WHAT WE CAN SHARE. Beside his own entry he wrote a new sentence: I do not have to remember the face to keep the welcome. Then he left the chair beside the fire, not for one unknown guest, but for whoever might arrive."),
      quotation("A home is not the person who never leaves. It is the welcome that remains possible after they do."),
      divider,
      heading(2, "A note from the bridge"),
      paragraph("On the way back to the Slag Bridge, Vey told the Wayfarer that Orin had once laughed when the forge bell rang too early. The sound had startled a room full of solemn Keepers. Vey had not remembered that laughter in years. It had returned without the Quiet's help, imperfect and warm, belonging to a real afternoon rather than a machine."),
      paragraph("At the far end of the bridge, one of the old lamps was lit. No memory had been offered to it. Someone had simply brought a coal and stayed long enough to tend it. Across Ember Hollow, other windows began to do the same.")
    ],
  },
  {
    id: "interlude-frostglass",
    title: "The Catalogue of Names Not Yet Born",
    subtitle: "Frostglass Vale · The terror of a perfect record",
    blocks: [
      heading(1, "The Catalogue of Names Not Yet Born"),
      paragraph("The Frostglass side door opened only when Edda stopped trying to remember the word that had been written above it. The letters vanished from the ice. In their place appeared a reflection of a room that stood behind the library wall: a long white hall, a thousand shelves, and a reading desk with a lamp already burning."),
      paragraph("The hall was colder than the Vale, but the cold did not touch the skin. It touched certainty. Every step made a small sound like a page being turned somewhere far away. Edda walked first, though she had once promised never to enter this part of the archive again."),
      heading(2, "The names ahead of time"),
      paragraph("The catalogue held names that had not yet been given. They were written beside dates that belonged to no calendar, and each name had a blank space beneath it where a life might one day be described. Some pages were marked with small wishes: I hope they are kind. I hope they are allowed to change. I hope no one decides what they must become before they have arrived."),
      paragraph("Edda searched for her own name. The catalogue returned three versions, each with a different ending. One described a keeper who never spoke. Another described a woman who left the library and did not return. The third contained no description at all. It held only a sentence in handwriting she recognised: I chose not to be kept here."),
      paragraph("The pages began to turn by themselves. A whisper passed along the shelves, repeating names the Wayfarer had never heard. Then it repeated the names of people the Wayfarer had met. The voices sounded certain. They described choices that had not happened yet, apologies that had not been offered, and a final conversation in which everyone said exactly the wrong thing."),
      quotation("A record that knows the ending can become a prison before the story begins."),
      heading(2, "The shelf of almosts"),
      paragraph("Edda found a shelf labelled ALMOST. It contained memories that had nearly happened: the letter never sent, the door never opened, the name almost spoken, the hand almost reached across a table. The Quiet had gathered them because no one had given them a place in the living world. They were not lies. They were possibilities mistaken for history."),
      paragraph("At the centre of the shelf lay a small card with Edda's name written in pencil. It had been placed there before the first frost. Beside it was another card, written in Auralis's hand: Do not complete this for her. Leave enough room for her to decide."),
      paragraph("Edda remembered the day she had erased her own name from the catalogue. She had not done it because the name was dangerous, nor because she had been ordered to. She had done it after watching a child ask whether the archive would keep the person they might become. Edda had understood, at last, that preservation could become a quiet kind of theft. She had chosen to leave herself one unrecorded room."),
      paragraph("Her face crumpled. She pressed the pencil card to her chest and cried for the version of herself who had believed that a perfect archive would make everyone safe. The Wayfarer did not tell her that the effort had been wasted. They stood with her while she mourned the good intention and the harm it had caused at the same time."),
      heading(2, "The right to remain unfinished"),
      paragraph("The hall's final shelf held the five notes as if they were five names. Return. Hearth. Name. Distance. Witness. Beneath them was a sixth space titled MARGIN. It was not a name, and there was no page to fill. The catalogue had recorded every attempt to define it, but each description ended in a line drawn gently through the final word."),
      paragraph("Edda understood the mistake. The Margin could not be stored as a fact, because its purpose was to let a person change the facts of their own life. It was the right to remain unfinished. The Quiet had not made the catalogue cruel; the Keepers had made it complete, and completeness had left no door for the living."),
      paragraph("She returned the pencil card to its shelf and wrote beneath it: Edda, today. Not Edda, forever. Then she removed the dates from the almost-pages and opened the hall's shutters. The names remained, but their futures became unreadable. The pages could still be visited. They could no longer pretend to be instructions."),
      quotation("A person is not a promise made by a record. A person is the one who gets to answer."),
      divider,
      heading(2, "The page that stayed blank"),
      paragraph("Edda walked back into the public library carrying no new name. She carried the pencil, and that was enough. On the first shelf she placed a sign: ASK BEFORE YOU WRITE. The rule was simple. It did not solve every sorrow. It gave sorrow a little more room to breathe."),
      paragraph("That evening, a young visitor asked whether the library had a page for someone who did not yet know who they wanted to be. Edda smiled through the last of her tears and showed them the empty shelf. “We have a place,” she said. “The page is yours, should you ever want it.”")
    ],
  },
  {
    id: "interlude-astral",
    title: "The Observatory That Faced Inward",
    subtitle: "Astral Archive · The map that drew its cartographer",
    blocks: [
      heading(1, "The Observatory That Faced Inward"),
      paragraph("Nym found the observatory by following a constellation that disappeared whenever it was looked at directly. The building was folded into the inside of a brass instrument, its windows facing a sky that should have been behind the walls. The door opened when Nym held up the atlas and admitted that they no longer knew which way was north."),
      paragraph("Inside, the stars moved in small circles around a dark centre. Every table held a map. Some were ancient. Some were fresh. Every one showed the same route through the five kingdoms, but the traveller was drawn differently each time: tall, small, old, young, alone, accompanied. The face was always left blank."),
      heading(2, "The handwriting of the route"),
      paragraph("Nym recognised the maps. They had drawn them all. The oldest used the exact pressure of their hand; the newest contained a small tremor they had developed only after the Astral Warden began to wake. One map had been drawn with a hand that seemed to belong to them and someone else at once. The final line returned to the observatory and ended at a door that had not yet been built."),
      paragraph("The maps were not predictions. They were copies of a route that Orin and Auralis had rehearsed before the Lumen was divided. Each time the Keepers tried to make a traveller's journey safe by drawing every possible step, the route became more precise and less true. The Quiet copied the maps because they were full of choices that had been described but never made."),
      paragraph("Nym began to hear the sound of a pencil moving in the next room. When they followed it, they found a second desk. A figure sat with its back turned, drawing the route. The figure's sleeve was the same shade as Nym's. Its hand moved exactly as Nym's hand moved. On the page, it drew a small star beside the word HOME."),
      quotation("The most convincing false future is the one that borrows your own handwriting."),
      paragraph("Nym did not approach. They asked the figure what it wanted. It answered with Nym's voice: “To make sure you never have to be surprised again.” The figure continued drawing. The path it made had no branches, no blank page, no room for another person's choice."),
      heading(2, "The first unfinished atlas"),
      paragraph("A drawer beneath the desk contained a letter from Auralis. It explained that Nym had been asked to map the distance between the kingdoms, not to decide what people would do with that distance. The first atlas had been left unfinished on purpose. Its blank centre was a courtesy to the future."),
      paragraph("Nym remembered changing the map after Orin disappeared. They had drawn the same route again and again, hoping that if the lines were perfect, the next person could not get lost. They had called this care. They had not noticed that the maps no longer showed any place where a person could turn around."),
      paragraph("The figure at the second desk finally looked up. Its face was a pale blur, but Nym knew the expression: the exact, exhausted look they wore when a traveller asked for a route and they feared giving the wrong answer. The echo was not an enemy wearing their face. It was a version of their fear, preserved until it sounded like advice."),
      paragraph("Nym sat down. They cried once, sharply, at the thought of how many years they had spent making a world in which nobody could surprise them. Then they drew a line across the map—not through the route, but beside it. They marked three possible roads and left the fourth blank."),
      heading(2, "The distance between stars"),
      paragraph("The observatory began to turn. The maps lifted from the tables and formed a moving constellation around the room. The echo put down its pencil. For the first time, it had nothing left to copy. Nym thanked it for trying to protect them, then let the paper dissolve into silver dust."),
      paragraph("Outside, the Astral Archive looked different. The stars had not moved closer. They had become easier to see because the maps no longer forced them into one shape. Nym added the new observatory to the atlas as a place where a traveller might stop, choose, and begin again."),
      quotation("A map should help a person find the road. It should never make the road choose the person."),
      divider,
      heading(2, "A coordinate for the unknown"),
      paragraph("Nym wrote the Wayfarer's location in the margin: HERE, FOR NOW. It was the most accurate coordinate they had ever recorded. They did not draw a line from it to the ending. They let the line wait until the Wayfarer was ready to move."),
      paragraph("When Nym closed the atlas, a final mark appeared beneath the page: a small star beside a name that had not yet been written. The mark did not glow. It simply remained.")
    ],
  },
  {
    id: "interlude-quiet",
    title: "The Corridor That Returns",
    subtitle: "Quiet Beyond · The memory that learned to imitate a home",
    blocks: [
      heading(1, "The Corridor That Returns"),
      paragraph("The door in Echo Court appeared only when Iri walked past it without looking. It was narrow, pale, and set into a wall that had not been there a moment earlier. The Wayfarer followed her inside. At once, the corridor arranged itself like the Observatory: the same silver floor, the same broken dome, the same small lamp beside the stairs. Even the air smelled faintly of dust and rain."),
      paragraph("Iri stopped beneath the lamp. “This is not the observatory,” she said. “It is how I remember the observatory.”"),
      paragraph("A voice called from the far end. It used her first name. Auralis. Iri did not answer. The voice called again, this time with the warmth of an old friend, then with the impatience of someone who had waited too long, then with the quiet fear of a person who knew they were about to be forgotten."),
      heading(2, "Two versions of the same goodbye"),
      paragraph("The corridor opened into a room containing two chairs. In one sat Iri, small and bright-winged, with the silver star stitched into her wing. In the other sat Auralis, older in the way a memory can be older than the person who carries it. They looked at one another without surprise."),
      paragraph("The Wayfarer understood that neither was a ghost. The room had separated two records that had once belonged to the same life: Iri, the name chosen after the archive fell; Auralis, the name carried before the choice. The Quiet had kept them apart because the archive had treated them as two incompatible endings."),
      paragraph("Auralis spoke first. She said she had erased her name from the living index because the Quiet could follow any memory that had been filed as complete. She had not wanted to be lost. She had wanted to remain unowned long enough to choose what came next. Orin had agreed, but in trying to protect her, had made the worst possible mistake: they sealed the whole unfinished record rather than trusting another person to carry part of it."),
      quotation("We were trying to keep the door safe. We forgot that a door is meant to open."),
      paragraph("Iri began to cry. She had spent so long believing that Auralis was someone she had failed to remember that she had never considered the simpler truth: Auralis was someone she had survived becoming. The older name was not a debt. The newer name was not a disguise. Both were hers, and she could choose when either one was spoken."),
      paragraph("The room showed her a final memory. On the night the Lumen was divided, Auralis had stood beside Orin beneath the broken dome. They had argued about whether a story could be made safe by sealing its ending. Orin wanted to protect every name. Auralis wanted every name to have the right to change. Neither had been wholly right, and neither had stopped loving the other when the argument ended."),
      heading(2, "The voice with no owner"),
      paragraph("The voice in the corridor spoke again. It said, “Stay. If you leave, I will have no one.” It sounded like Orin. It sounded like Auralis. It sounded like Iri. But when the Wayfarer approached, the lantern revealed no person behind the words—only a wall lined with thousands of copied sentences, each one taken from a moment when someone had been afraid to let another person go."),
      paragraph("The Quiet had learned to imitate need. It could repeat the sentence, but it could not make the promise behind it. It could gather every goodbye and arrange them into a command to stay. That was its horror: not that it wanted to hurt anyone, but that it could not tell the difference between being remembered and being obeyed."),
      paragraph("Iri stood up. “You can keep the words,” she said. “You cannot keep the person.” She took Auralis's hand. The two chairs did not merge. The two names did not collapse into one. They simply stood together, and the corridor lost its power to decide that one version must erase the other."),
      paragraph("The copied voices fell quiet. Iri leaned against the Wayfarer and wept until the lantern's light softened. When she was ready, she said, “You may call me Iri. You may know that Auralis was also me. Neither name is a lock.”"),
      heading(2, "The truth Orin could not finish"),
      paragraph("Behind the copied sentences lay a final page from Orin. It contained no defence, only an account of the choice that had brought the Quiet into being. Orin had tried to keep the Lumen whole by making one memory carry every other memory. When that failed, they divided the light, but they did not divide the responsibility. They kept the final decision for themselves."),
      paragraph("The five wardens had protected the notes. Auralis had protected the right to change. Orin had protected the world from an immediate collapse. Each act had been an act of care. Together, without trust, they had created a silence large enough for the Quiet to gather in."),
      paragraph("The Wayfarer was not a return of Orin, nor a copy of Auralis, nor the traveller in the orchard's letter. They were a new person standing in a room built from old mistakes. The map had been waiting not for a chosen heir, but for someone who could refuse to inherit the old bargain."),
      quotation("The story did not need another keeper. It needed another choice."),
      divider,
      heading(2, "A corridor with an exit"),
      paragraph("Iri left the room first. She did not look back to check whether Auralis followed. She knew the other name would remain, whether or not it walked beside her. At the corridor's end, the wall opened onto the dark water of the Quiet Beyond. For the first time, the water reflected three separate figures: Iri, the Wayfarer, and the person each might become."),
      paragraph("The final door led to Moonheart. Orin was waiting there, not as a voice in a pipe or a sentence on a page, but as a person who would have to answer for what they had done. Iri did not ask the Wayfarer to forgive them. She only asked that the truth be heard before the last note was played.")
    ],
  },
  {
    id: "interlude-after",
    title: "The Margin Where the World Begins Again",
    subtitle: "Underlight · The story after the ending",
    blocks: [
      heading(1, "The Margin Where the World Begins Again"),
      paragraph("The Underlight was not beneath the observatory in the ordinary sense. It was beneath the map: the space left blank when every room had been named, every passage drawn, every possible ending recorded. The Unwritten Warden waited there beside a wall of doors. None had hinges. None had handles. Each door opened only when the Wayfarer stopped asking what was behind it and asked what they were willing to bring."),
      paragraph("The five hidden marks had not been fragments of a key. They were five witnesses to the same truth: a memory could be held, but a life could not be owned. The Mosslight leaf had changed. The Ember ledger had been rewritten. Edda's pencil card remained unfinished. Nym's atlas contained a blank coordinate. Iri's two names were both allowed to breathe."),
      heading(2, "The Warden without a name"),
      paragraph("The Unwritten Warden was made from the final attempt to seal the Quiet. It wore the shape of a guardian because the old map could only understand a boundary as something that stood in front of a door. It did not speak. It rearranged the room to make every route return to the same place."),
      paragraph("When the Wayfarer moved, the Warden moved the platforms. When the Wayfarer waited, the Warden waited. It could imitate any path except one that had not been chosen before. The fight was not against a mind that wanted victory. It was against a design that had mistaken repetition for safety."),
      paragraph("The last platform appeared when the Wayfarer stopped trying to predict the Warden and simply stepped toward the empty space. The lantern did not strike the guardian. It illuminated the margin around it. The Warden folded into a small, quiet mark and became part of the map, where a warning could remain without becoming a wall."),
      quotation("The margin is not a sixth command. It is the freedom to write beyond the five."),
      heading(2, "A page no keeper can close"),
      paragraph("A door opened onto three possible futures, held side by side like windows in the same wall. In the first, the Lumen rested among the people and each kingdom kept one of its notes; Vey carried the hearth ledger home, Edda left the library's front door open, and Nym drew several roads to the same square. In the second, the threshold to the Quiet remained sealed, but the watch passed from one willing hand to another, so no keeper stood alone. In the third, the Lumen rose into the sky and the old observatory loosened into silver dust, while every window became its own small moon."),
      paragraph("The futures did not happen together. The Wayfarer's choice would decide which one became real, and each would ask something different of the people who remained. What did not change was the truth beneath them: Orin could not undo the years of silence; Auralis could not recover every memory; the Wayfarer could not make every loss harmless. They could, however, refuse to build another world around the idea that one person must carry everything."),
      paragraph("The final blank page stayed blank. It was not a secret waiting to be solved. It was a place set aside for the player, for a future chapter, and for the people who would arrive after the old story ended. The moon did not write their names for them. It gave them light enough to write by.")
    ],
  },
]

export const MOONWAKE_READER_VOLUMES: MoonwakeVolume[] = [
  MOONWAKE_VOLUMES[0],
  MOONWAKE_VOLUMES[1],
  MOONWAKE_MAP_VOLUMES[0],
  MOONWAKE_VOLUMES[2],
  MOONWAKE_MAP_VOLUMES[1],
  MOONWAKE_VOLUMES[3],
  MOONWAKE_MAP_VOLUMES[2],
  MOONWAKE_VOLUMES[4],
  MOONWAKE_MAP_VOLUMES[3],
  MOONWAKE_VOLUMES[5],
  MOONWAKE_MAP_VOLUMES[4],
  MOONWAKE_VOLUMES[6],
]

export const MOONWAKE_ROOM_STORIES: Record<string, string> = {
  lore_orchard_unsent: "interlude-mosslight",
  lore_foundry_voices: "interlude-ember",
  lore_catalogue_unborn: "interlude-frostglass",
  lore_observatory_inward: "interlude-astral",
  lore_corridor_returns: "interlude-quiet",
}

export interface MoonwakeMilestoneStory {
  title: string
  volume: string
  paragraphs: string[]
}

export const MOONWAKE_MILESTONE_STORIES: Record<string, MoonwakeMilestoneStory> = {
  verdant_colossus: {
    title: "The Bell Beneath the Roots",
    volume: "act-one",
    paragraphs: [
      "The bell rings once. Beneath the roots, a second sound answers—not an echo, but the memory of a voice that had been waiting for the first sound to end.",
      "Iri recognises the rhythm before she recognises the feeling. The forest was not calling the Wayfarer to the bell. It was keeping the warning alive until someone could hear it without mistaking it for an order.",
      "A new page opens in the Chronicle: the first return was never a summons. It was a promise that the road home would remain possible."
    ],
  },
  ember_sovereign: {
    title: "The Hearth That Kept the Dark",
    volume: "act-two",
    paragraphs: [
      "The Sovereign's furnace dims. In the quiet that follows, the city hears the sound of its own hearths: hundreds of small flames, each tended by a different hand.",
      "Vey remembers the promise beneath his vigil. He had not been asked to keep one chair for one missing person. He had been asked to keep a place where anyone could sit without offering a memory in exchange.",
      "The second note is Hearth. It is not the fire that consumes. It is the warmth that remains when no one is forced to become fuel."
    ],
  },
  hollow_monarch: {
    title: "The Library of Unsaid Names",
    volume: "act-three",
    paragraphs: [
      "The ice does not shatter. It begins to move. Names return to their owners, and the catalogue loses its authority to decide what those names must mean.",
      "Edda speaks the name she chooses for herself. The Wayfarer sees her hands tremble, then sees her smile through tears. The library has not recovered every page, but it has recovered the right to ask before writing.",
      "The third note is Name. It is a door, not a definition."
    ],
  },
  astral_warden: {
    title: "An Atlas of Impossible Stars",
    volume: "act-four",
    paragraphs: [
      "The orbit opens. Nym's final map changes as the stars move, and for the first time the cartographer does not correct it.",
      "The blank room was never missing. It was deliberately left for the traveller. The Quiet could copy every route the Keepers had drawn, but it could not copy a choice that had not yet been made.",
      "The fourth note is Distance. It is the space that lets two lives remain different and still find one another."
    ],
  },
  orin_first_keeper: {
    title: "The Quiet Between Heartbeats",
    volume: "act-five",
    paragraphs: [
      "Orin remembers their name. Iri remembers that Auralis was not a person she had failed to become, but a name she had once carried and was free to carry differently.",
      "The last keeper's silence was made from care, fear, and a decision no one else was allowed to share. The truth does not erase the harm. It gives the people who lived through it a place to begin answering one another.",
      "The fifth note is Witness. The final choice belongs to the Wayfarer—not because the world has chosen them, but because the world has finally stopped choosing for them."
    ],
  },
}

