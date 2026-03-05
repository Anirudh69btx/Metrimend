/* ============================================
   METRIMEND - JAVASCRIPT LOGIC
   ============================================ */

// --- DATA: All Tools Configuration ---
const TOOLS_DATA = {
    fitness: {
        name: 'Fitness Calculators',
        tools: [
            { id: 'bmi', name: 'BMI Calculator', fields: [
                { id: 'age', label: 'Age', unit: 'years', type: 'number', placeholder: '25' },
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number', placeholder: '175' },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number', placeholder: '70' }
            ]},
            { id: 'bmr', name: 'BMR Calculator', fields: [
                { id: 'age', label: 'Age', unit: 'years', type: 'number' },
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' }
            ]},
            { id: 'tdee', name: 'TDEE Calculator', fields: [
                { id: 'age', label: 'Age', unit: 'years', type: 'number' },
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' },
                { id: 'activity', label: 'Activity Level', type: 'select', options: [
                    'Sedentary (office job)', 
                    'Light (exercise 1-3 days)', 
                    'Moderate (exercise 3-5 days)', 
                    'Active (exercise 6-7 days)',
                    'Very Active (athlete)'
                ]}
            ]},
            { id: 'idealWeight', name: 'Ideal Weight', fields: [
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' }
            ]},
            { id: 'bodyFat', name: 'Body Fat % (US Navy)', fields: [
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' },
                { id: 'neck', label: 'Neck Circumference', unit: 'cm', type: 'number' },
                { id: 'waist', label: 'Waist (at navel)', unit: 'cm', type: 'number' },
                { id: 'hip', label: 'Hip (women only)', unit: 'cm', type: 'number', optional: true }
            ]},
            { id: 'leanMass', name: 'Lean Body Mass', fields: [
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' }
            ]},
            { id: 'waistHeight', name: 'Waist-to-Height', fields: [
                { id: 'waist', label: 'Waist Circumference', unit: 'cm', type: 'number' },
                { id: 'height', label: 'Height', unit: 'cm', type: 'number' }
            ]},
            { id: 'vo2max', name: 'VO2 Max (Rockport)', fields: [
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'age', label: 'Age', unit: 'years', type: 'number' },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' },
                { id: 'time', label: '1 Mile Walk Time', unit: 'min', type: 'number', placeholder: 'e.g. 15' },
                { id: 'hr', label: 'Ending Heart Rate', unit: 'bpm', type: 'number' }
            ]}
        ]
    },
    cardio: {
        name: 'Cardio Tools',
        tools: [
            { id: 'pace', name: 'Pace Calculator', fields: [
                { id: 'distance', label: 'Distance', unit: 'km', type: 'number' },
                { id: 'minutes', label: 'Time (Minutes)', unit: 'min', type: 'number' },
                { id: 'seconds', label: 'Time (Seconds)', unit: 'sec', type: 'number' }
            ]},
            { id: 'caloriesBurned', name: 'Calories Burned', fields: [
                { id: 'activity', label: 'Activity', type: 'select', options: ['Running (8km/h)', 'Cycling (moderate)', 'Swimming', 'Walking (brisk)', 'HIIT', 'Jump Rope'] },
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' },
                { id: 'duration', label: 'Duration', unit: 'minutes', type: 'number' }
            ]}
        ]
    },
    strength: {
        name: 'Strength Tools',
        tools: [
            { id: 'oneRM', name: 'One Rep Max (1RM)', fields: [
                { id: 'weight', label: 'Weight Lifted', unit: 'kg', type: 'number' },
                { id: 'reps', label: 'Reps Completed', unit: 'reps', type: 'number' }
            ]},
            { id: 'strengthLevel', name: 'Strength Level', fields: [
                { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                { id: 'bodyweight', label: 'Body Weight', unit: 'kg', type: 'number' },
                { id: 'lift', label: 'Lift Type', type: 'select', options: ['Bench Press', 'Squat', 'Deadlift'] },
                { id: 'weight', label: 'Weight Lifted', unit: 'kg', type: 'number' }
            ]}
        ]
    },
    nutrition: {
        name: 'Nutrition Tools',
        tools: [
            { id: 'macro', name: 'Macro Calculator', fields: [
                { id: 'calories', label: 'Daily Calories', unit: 'kcal', type: 'number' },
                { id: 'goal', label: 'Goal', type: 'select', options: ['Balanced', 'High Protein', 'Low Carb', 'Keto'] }
            ]},
            { id: 'water', name: 'Water Intake', fields: [
                { id: 'weight', label: 'Weight', unit: 'kg', type: 'number' },
                { id: 'activity', label: 'Activity Level', type: 'select', options: ['Low', 'Moderate', 'High', 'Intense'] }
            ]},
            { id: 'protein', name: 'Protein Intake', fields: [
                { id: 'weight', label: 'Body Weight', unit: 'kg', type: 'number' },
                { id: 'goal', label: 'Goal', type: 'select', options: ['Maintenance', 'Muscle Gain', 'Fat Loss'] }
            ]}
        ]
    },
    health: {
        name: 'Health Tools',
        tools: [
            { id: 'bloodPressure', name: 'Blood Pressure', fields: [
                { id: 'systolic', label: 'Systolic (Upper)', unit: 'mmHg', type: 'number' },
                { id: 'diastolic', label: 'Diastolic (Lower)', unit: 'mmHg', type: 'number' }
            ]},
            { id: 'sleep', name: 'Sleep Cycle', fields: [
                { id: 'wakeHour', label: 'Wake Up Hour', type: 'select', options: Array.from({length: 24}, (_, i) => `${i}:00`) },
                { id: 'cycles', label: 'Sleep Cycles Needed', type: 'select', options: ['3 Cycles (4.5h)', '4 Cycles (6h)', '5 Cycles (7.5h)', '6 Cycles (9h)'] }
            ]}
        ]
    }
};

// --- CHART INSTANCES ---
let weightChart, macroChart, bodyCompChart;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initSparkles();
    initNavigation();
    initCharts();
    init3DEffect();
});

// --- BACKGROUND EFFECTS ---
function initSparkles() {
    const container = document.getElementById('sparkles-container');
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 10}s`;
        sparkle.style.animationDuration = `${5 + Math.random() * 10}s`;
        container.appendChild(sparkle);
    }
}

// --- NAVIGATION ---
function initNavigation() {
    const toggle = document.getElementById('mobileToggle');
    const links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => links.classList.toggle('active'));
}

// --- 3D CARD EFFECT ---
function init3DEffect() {
    const boxes = document.querySelectorAll('.tool-box');
    boxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            const inner = box.querySelector('.tool-box-inner');
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            const glow = box.querySelector('.tool-box-glow');
            glow.style.setProperty('--mouse-x', `${x}px`);
            glow.style.setProperty('--mouse-y', `${y}px`);
        });
        box.addEventListener('mouseleave', () => {
            const inner = box.querySelector('.tool-box-inner');
            inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// --- MODAL LOGIC ---
function openCategory(category) {
    const data = TOOLS_DATA[category];
    document.getElementById('modalTitle').textContent = data.name;
    
    const listHtml = data.tools.map(tool => `
        <div class="tool-item" onclick="openTool('${category}', '${tool.id}')">
            <div class="tool-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <span class="tool-item-name">${tool.name}</span>
        </div>
    `).join('');
    
    document.getElementById('toolsList').innerHTML = listHtml;
    document.getElementById('calculatorForm').classList.remove('active');
    document.getElementById('resultsPanel').classList.remove('active');
    document.getElementById('toolsList').style.display = 'grid';
    
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function backToTools() {
    document.getElementById('calculatorForm').classList.remove('active');
    document.getElementById('resultsPanel').classList.remove('active');
    document.getElementById('toolsList').style.display = 'grid';
}

// --- TOOL FORM GENERATOR ---
function openTool(category, toolId) {
    const categoryData = TOOLS_DATA[category];
    const tool = categoryData.tools.find(t => t.id === toolId);
    
    document.getElementById('toolsList').style.display = 'none';
    document.getElementById('calculatorForm').classList.add('active');
    document.getElementById('resultsPanel').classList.remove('active');
    
    const formHtml = `
        <h3 style="margin-bottom: 1.5rem; font-family: 'Orbitron', sans-serif; color: var(--accent-primary);">${tool.name}</h3>
        <div class="form-grid">
            ${tool.fields.map(f => `
                <div class="form-group ${f.type === 'select' && f.options.length > 5 ? 'full-width' : ''}">
                    <label class="form-label">${f.label}</label>
                    ${f.type === 'select' ? 
                        `<select class="form-select" id="input_${f.id}">
                            ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                        </select>` :
                        `<input type="number" class="form-input" id="input_${f.id}" placeholder="${f.placeholder || ''}">
                         ${f.unit ? `<span class="form-unit">${f.unit}</span>` : ''}`
                    }
                </div>
            `).join('')}
        </div>
        <button class="calculate-btn" onclick="calculateResult('${tool.id}')">Calculate</button>
    `;
    
    document.getElementById('formContent').innerHTML = formHtml;
    window.currentTool = tool;
}

// --- CALCULATION ENGINE ---
function calculateResult(toolId) {
    const inputs = {};
    window.currentTool.fields.forEach(f => {
        const el = document.getElementById(`input_${f.id}`);
        inputs[f.id] = f.type === 'select' ? el.value : parseFloat(el.value);
    });

    let result, suggestions = [];
    
    // Logic for different tools
    switch(toolId) {
        case 'bmi':
            const hM = inputs.height / 100;
            result = (inputs.weight / (hM * hM)).toFixed(1);
            if (result < 18.5) suggestions = ['Increase calorie intake', 'Consult a nutritionist', 'Strength training recommended'];
            else if (result > 25) suggestions = ['Increase physical activity', 'Monitor diet', 'Consult a doctor for personalized plan'];
            else suggestions = ['Great job! Maintain your lifestyle', 'Keep up with regular check-ups'];
            break;
            
        case 'bmr':
            if (inputs.gender === 'Male') {
                result = Math.round(88.362 + (13.397 * inputs.weight) + (4.799 * inputs.height) - (5.677 * inputs.age));
            } else {
                result = Math.round(447.593 + (9.247 * inputs.weight) + (3.098 * inputs.height) - (4.330 * inputs.age));
            }
            suggestions = ['This is your resting metabolism', 'Eat at least this many calories', 'Exercise increases your daily need'];
            break;
            
        case 'tdee':
            let bmr;
            if (inputs.gender === 'Male') {
                bmr = 88.362 + (13.397 * inputs.weight) + (4.799 * inputs.height) - (5.677 * inputs.age);
            } else {
                bmr = 447.593 + (9.247 * inputs.weight) + (3.098 * inputs.height) - (4.330 * inputs.age);
            }
            const multipliers = { 'Sedentary (office job)': 1.2, 'Light (exercise 1-3 days)': 1.375, 'Moderate (exercise 3-5 days)': 1.55, 'Active (exercise 6-7 days)': 1.725, 'Very Active (athlete)': 1.9 };
            result = Math.round(bmr * (multipliers[inputs.activity] || 1.2));
            suggestions = [`Maintain: ${result} kcal`, `Fat Loss: ${Math.round(result * 0.8)} kcal`, `Muscle Gain: ${Math.round(result * 1.15)} kcal`];
            break;

        case 'oneRM':
            // Epley Formula
            result = Math.round(inputs.weight * (1 + inputs.reps / 30));
            suggestions = [`Estimated 1RM: ${result}kg`, `85% (5 reps): ${Math.round(result*0.85)}kg`, `70% (10 reps): ${Math.round(result*0.7)}kg`];
            break;

        case 'bloodPressure':
            const sys = inputs.systolic;
            const dia = inputs.diastolic;
            if (sys < 120 && dia < 80) result = 'Normal';
            else if (sys < 130 && dia < 80) result = 'Elevated';
            else if (sys < 140 || dia < 90) result = 'High BP Stage 1';
            else result = 'High BP Stage 2';
            
            if(result !== 'Normal') suggestions = ['Consult a physician', 'Reduce sodium intake', 'Exercise regularly', 'Manage stress'];
            else suggestions = ['Keep up the good work!', 'Maintain a healthy diet'];
            break;

        case 'pace':
            const totalMin = inputs.minutes + (inputs.seconds / 60);
            const paceVal = (totalMin / inputs.distance).toFixed(2);
            const paceMin = Math.floor(paceVal);
            const paceSec = Math.round((paceVal - paceMin) * 60);
            result = `${paceMin}:${paceSec.toString().padStart(2, '0')} /km`;
            suggestions = ['Consistent pacing improves endurance', 'Try interval training to improve speed'];
            break;

        case 'macro':
            let p, c, f;
            if(inputs.goal === 'Balanced') { p = 0.3; c = 0.4; f = 0.3; }
            else if(inputs.goal === 'High Protein') { p = 0.4; c = 0.3; f = 0.3; }
            else if(inputs.goal === 'Low Carb') { p = 0.35; c = 0.25; f = 0.4; }
            else { p = 0.25; c = 0.05; f = 0.7; } // Keto
            
            const proG = Math.round((inputs.calories * p) / 4);
            const carbG = Math.round((inputs.calories * c) / 4);
            const fatG = Math.round((inputs.calories * f) / 9);
            result = `P: ${proG}g | C: ${carbG}g | F: ${fatG}g`;
            suggestions = ['Spread protein throughout the day', 'Choose complex carbs', 'Focus on healthy fats'];
            
            // Update Dashboard Chart
            updateMacroChart(proG, carbG, fatG);
            break;
            
        default:
            result = 'Calculation Complete';
            suggestions = ['Result generated successfully'];
    }
    
    displayResult(result, suggestions);
}

function displayResult(value, suggestions) {
    const panel = document.getElementById('resultsPanel');
    
    const html = `
        <div class="result-main">
            <div class="result-value">${value}</div>
            <div class="result-label">Your Result</div>
        </div>
        <div class="suggestions-box">
            <h4 class="suggestions-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
                Recommendations
            </h4>
            ${suggestions.map(s => `
                <div class="suggestion-item">
                    <div class="suggestion-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span class="suggestion-text">${s}</span>
                </div>
            `).join('')}
        </div>
        <div class="result-actions">
            <button class="action-btn" onclick="downloadResult('pdf')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>
                PDF
            </button>
            <button class="action-btn" onclick="downloadResult('csv')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                CSV
            </button>
        </div>
    `;
    
    panel.innerHTML = html;
    panel.classList.add('active');
}

// --- CHARTS.JS IMPLEMENTATION ---
function initCharts() {
    // Weight Chart
    const wCtx = document.getElementById('weightChart').getContext('2d');
    weightChart = new Chart(wCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Weight (kg)',
                data: [82, 81.5, 81, 80.2, 79.8],
                borderColor: '#00d4aa',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)' } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } }
            }
        }
    });

    // Macro Chart
    const mCtx = document.getElementById('macroChart').getContext('2d');
    macroChart = new Chart(mCtx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [{
                data: [150, 250, 65],
                backgroundColor: ['#00d4aa', '#f0b866', '#ff6b6b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.7)' } } }
        }
    });

    // Body Comp Chart
    const bCtx = document.getElementById('bodyCompChart').getContext('2d');
    bodyCompChart = new Chart(bCtx, {
        type: 'bar',
        data: {
            labels: ['Muscle', 'Fat', 'Water'],
            datasets: [{
                label: '%',
                data: [45, 18, 55],
                backgroundColor: ['#00d4aa', '#ff6b6b', '#4facfe'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
                x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.5)' } }
            }
        }
    });
}

function updateMacroChart(p, c, f) {
    if(macroChart) {
        macroChart.data.datasets[0].data = [p, c, f];
        macroChart.update();
    }
}

// --- EXPORT FEATURES ---
function downloadResult(type) {
    alert(`Generating ${type.toUpperCase()} report... (In a live app, this would download the file)`);
}

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if(e.target.id === 'modalOverlay') closeModal();
});