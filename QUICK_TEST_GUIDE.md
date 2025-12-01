# 🚀 Quick Test Guide - New Question Types

## ⚡ 2-Minute Quick Start

```bash
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

Open: `http://localhost:5173`

---

## 🧪 Test the 3 New Question Types

### 1️⃣ Short Answer (2 minutes)

**Navigate to:** `http://localhost:5173/exams/exam-16?mode=exam`

**Question 1 (q49):** "What is the capital of France?"
- ✅ Type: `Paris`
- ✅ Submit exam
- ✅ See green checkmark and "Correct" badge

**Question 2 (q50):** "Name the three states of matter"
- ✅ Type: `solid, liquid, gas`
- ✅ Character counter shows usage
- ✅ Auto-validates on submit

**Question 3 (q51):** "In what year was Declaration of Independence signed?"
- ✅ Type: `1776`
- ✅ Max 50 characters enforced

---

### 2️⃣ Essay (5 minutes)

**Still in Exam 16...**

**Question 4 (q52):** Essay about renewable energy (150-250 words)

**Test Word Counter:**
```
1. Start typing...
2. Watch word count: 0 / 150-250 (gray)
3. Write 50 words → counter turns orange ⚠️ "Too short"
4. Write 150 words → counter turns green ✅ "In range"
5. Write 260 words → counter turns red ❌ "Too long"
```

**See Rubric:**
- ✅ Clarity and Organization: 15 points
- ✅ Content and Arguments: 20 points  
- ✅ Grammar and Vocabulary: 10 points
- ✅ Examples and Evidence: 5 points
- ✅ **Total: 50 points**

---

### 3️⃣ Drag-and-Drop (3 minutes)

**Navigate to:** `http://localhost:5173/exams/exam-17?mode=exam`

**Question 1 (q53):** Order planets from the Sun

**Try Different Methods:**
```
Method 1: Mouse Drag
- Click and drag "Mercury" to position 1
- Drag "Venus" to position 2
- Continue with Earth, Mars, Jupiter...

Method 2: Arrow Buttons  
- Click ↑ to move item up
- Click ↓ to move item down
```

**Correct Order:**
1. Mercury
2. Venus  
3. Earth
4. Mars
5. Jupiter
6. Saturn
7. Uranus
8. Neptune

**Submit to See:**
- ✅ Green highlight = Correct position
- ❌ Red highlight = Wrong position
- 💡 Yellow badge = "Should be #X"

---

## 🎯 Quick Test All Features (10 minutes)

### Exam 18: Mixed Format Test
`http://localhost:5173/exams/exam-18?mode=exam`

**What's Tested:**
- ✅ Short Answer (2 questions)
- ✅ Essay (1 question, 200-300 words)
- ✅ Drag-Drop (1 question)

**Total:** 120 points, ~10 minutes

---

## 📊 Visual Checklist

After testing, you should have seen:

### Short Answer ✅
- [ ] Text input field with label
- [ ] Character counter (e.g., "5 / 50 characters")
- [ ] Green checkmark when correct
- [ ] Red X when incorrect
- [ ] List of acceptable answers if wrong

### Essay ✅
- [ ] Large textarea (300px tall)
- [ ] Real-time word counter
- [ ] Orange warning when too short
- [ ] Red warning when too long
- [ ] Green confirmation when in range
- [ ] Rubric table with point breakdown
- [ ] Total points calculation

### Drag-Drop ✅
- [ ] Grip icon (⋮⋮) on draggable items
- [ ] Numbered circles (1, 2, 3...)
- [ ] Arrow buttons (↑↓) for keyboard users
- [ ] Visual feedback during drag
- [ ] Green borders for correct positions
- [ ] Red borders for wrong positions
- [ ] "Should be #X" hints
- [ ] Smooth animations

---

## 🌐 Verify English Translation

Quick check all translated exams:

```
✅ Exam 4: http://localhost:5173/exams/exam-4
   "Who established the Edo Shogunate?" (was Japanese)

✅ Exam 5: http://localhost:5173/exams/exam-5
   "What is the net force on uniform motion?" (was Japanese)

✅ Exam 6: http://localhost:5173/exams/exam-6
   "What is the chemical formula for water?" (was Japanese)

✅ Exam 7: http://localhost:5173/exams/exam-7
   "She ___ to school every day." (was Japanese)

✅ Exam 8: http://localhost:5173/exams/exam-8
   "When 2x + 5 = 13, what is x?" (was Japanese)

✅ Exam 9: http://localhost:5173/exams/exam-9
   "French Revolution year?" (was Japanese)

✅ Exam 10: http://localhost:5173/exams/exam-10
   "Author of The Pillow Book?" (was Japanese)

✅ Exam 11: http://localhost:5173/exams/exam-11
   "DNA base pairing?" (was Japanese)

✅ Exam 12: http://localhost:5173/exams/exam-12
   "Japan's highest peak?" (was Japanese)
```

**All should now be in English!** ✅

---

## 🐛 Common Issues & Solutions

### Issue: "Question type not supported"
**Solution:** Refresh the browser (Ctrl+R / Cmd+R)

### Issue: Drag-drop not working
**Solution:** Use arrow buttons (↑↓) as fallback

### Issue: Essay word count not updating
**Solution:** Type more text, counter updates every keystroke

### Issue: Short answer marked wrong
**Solution:** Check capitalization (case-insensitive matching works)

---

## 📸 Expected Screenshots

### Short Answer (Correct)
```
┌────────────────────────────────────┐
│ What is the capital of France?    │
│ ✅ Correct                         │
├────────────────────────────────────┤
│ Your Answer (max 50 characters)   │
│ [Paris                         ]   │
│                        5 / 50 chars│
└────────────────────────────────────┘
```

### Essay (In Progress)
```
┌────────────────────────────────────┐
│ Write about renewable energy...   │
│                   175 / 150-250 ✅ │
├────────────────────────────────────┤
│ [Renewable energy sources are   ]  │
│ [crucial for combating climate  ]  │
│ [change because they reduce...  ]  │
│                                    │
└────────────────────────────────────┘
```

### Drag-Drop (Reordering)
```
┌────────────────────────────────────┐
│ Order planets from the Sun         │
├────────────────────────────────────┤
│ ⋮⋮  ① Mercury                   ↑↓ │ ✅ Green
│ ⋮⋮  ② Venus                     ↑↓ │ ✅ Green
│ ⋮⋮  ③ Earth                     ↑↓ │ ✅ Green
│ ⋮⋮  ④ Mars                      ↑↓ │ ✅ Green
│ ⋮⋮  ⑤ Jupiter    [Should be #7]↑↓ │ ❌ Red
└────────────────────────────────────┘
```

---

## ✅ Success Criteria

You've successfully tested everything when:

1. ✅ You can type short answers and see validation
2. ✅ Word counter changes color based on essay length
3. ✅ You can drag items or use arrow buttons
4. ✅ All Japanese exams now show English questions
5. ✅ Submit works and shows correct/incorrect feedback
6. ✅ Explanations appear after submission

---

## 🎉 That's It!

**Total test time:** ~10 minutes  
**Coverage:** All 3 new question types  
**Status:** ✅ Ready for production

If everything works as described above, your platform is **fully functional** and **ready to use**! 🚀

---

## 📞 Need Help?

Check these files for details:
- `COMPLETE_UPDATE_SUMMARY.md` - Full technical documentation
- `NEW_QUESTION_TYPES_AND_TRANSLATIONS.md` - Question type details
- `db.json` - All exam data

**Happy Testing! 🎓✨**

