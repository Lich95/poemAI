
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    "poemai_title": "AI Poem Generator",
    "poemai_input_title": "AI Poem Generator",
    "poemai_input_subtitle": "Generate a poem about...",
    "poemai_input_tips": "The Journey of a Wandering Cloud",
    "poemai_generate_btn": "Generate Poem",
    "poemai_powered_by_gpt": "Powered By ChatGPT",
    "poemai_thinking_status": "Thinking...",
    "poemai_network_err_toast": "Network error. Try again plz",
    "poemai_server_err_toast": "Server error, please try again",
    "poemai_generated_failed_toast": "Failed to generate poem, please try again",
    "poemai_generated_poem": "Generated Poem",
    "poemai_copy_btn": "Copy",
    "poemai_copy_success_toast": "Copied successfully",
    "poemai_privacy": "Privacy Policy"
  },
  fr: {
    "poemai_title": "Générateur de poème",
    "poemai_input_title": "Générateur de poème",
    "poemai_input_subtitle": "Générer un poème sur...",
    "poemai_input_tips": "Première neige sur la montagne",
    "poemai_generate_btn": "Générer",
    "poemai_powered_by_gpt": "Propulsé par ChatGPT",
    "poemai_thinking_status": "Réflexion...",
    "poemai_network_err_toast": "Erreur réseau. Réessayez svp",
    "poemai_server_err_toast": "Erreur du serveur, veuillez réessayer",
    "poemai_generated_failed_toast": "Échec de la génération du poème, veuillez réessayer",
    "poemai_generated_poem": "Poème généré",
    "poemai_copy_btn": "Copier",
    "poemai_copy_success_toast": "Copié avec succès",
    "poemai_privacy": "Politique de confidentialité"
  },
  ru: {
    "poemai_title": "Генератор Стихов",
    "poemai_input_title": "Генератор Стихов",
    "poemai_input_subtitle": "Сгенерировать стих о...",
    "poemai_input_tips": "Ветер в поле звенит",
    "poemai_generate_btn": "Генерировать",
    "poemai_powered_by_gpt": "На платформе ChatGPT",
    "poemai_thinking_status": "Думаю...",
    "poemai_network_err_toast": "Ошибка сети. Попробуйте еще раз",
    "poemai_server_err_toast": "Ошибка сервера, попробуйте еще раз",
    "poemai_generated_failed_toast": "Не удалось сгенерировать стих, попробуйте еще раз",
    "poemai_generated_poem": "Сгенерированный стих",
    "poemai_copy_btn": "Копировать",
    "poemai_copy_success_toast": "Успешно скопировано",
    "poemai_privacy": "Политика конфиденциальности"
  },
  de: {
    "poemai_title": "Gedichten Generator",
    "poemai_input_title": "Gedichten Generator",
    "poemai_input_subtitle": "Generiere ein Gedicht über...",
    "poemai_input_tips": "Herbstwind in den alten Gassen",
    "poemai_generate_btn": "Generieren",
    "poemai_powered_by_gpt": "Angetrieben von ChatGPT",
    "poemai_thinking_status": "Denken...",
    "poemai_network_err_toast": "Netzwerkfehler. Bitte versuchen Sie es erneut",
    "poemai_server_err_toast": "Serverfehler, bitte versuchen Sie es erneut",
    "poemai_generated_failed_toast": "Gedicht konnte nicht generiert werden, bitte versuchen Sie es erneut",
    "poemai_generated_poem": "Generiertes Gedicht",
    "poemai_copy_btn": "Kopieren",
    "poemai_copy_success_toast": "Erfolgreich kopiert",
    "poemai_privacy": "Datenschutzrichtlinie"
  },
  it: {
    "poemai_title": "Generatore di poesie",
    "poemai_input_title": "Generatore di poesie",
    "poemai_input_subtitle": "Genera una poesia su...",
    "poemai_input_tips": "Baci sotto la pioggia",
    "poemai_generate_btn": "Genera",
    "poemai_powered_by_gpt": "Alimentato da ChatGPT",
    "poemai_thinking_status": "Pensando...",
    "poemai_network_err_toast": "Errore di rete. Riprova per favore",
    "poemai_server_err_toast": "Errore del server, riprova",
    "poemai_generated_failed_toast": "Generazione della poesia fallita, riprova",
    "poemai_generated_poem": "Poesia generata",
    "poemai_copy_btn": "Copia",
    "poemai_copy_success_toast": "Copiato con successo",
    "poemai_privacy": "Politica sulla privacy"
  },
  pt: {
    "poemai_title": "Gerador de Poemas",
    "poemai_input_title": "Gerador de Poemas",
    "poemai_input_subtitle": "Gerar um poema sobre...",
    "poemai_input_tips": "Dança das flores silvestres",
    "poemai_generate_btn": "Gerar",
    "poemai_powered_by_gpt": "Alimentado por ChatGPT",
    "poemai_thinking_status": "Pensando...",
    "poemai_network_err_toast": "Erro de rede. Tente novamente",
    "poemai_server_err_toast": "Erro no servidor, tente novamente",
    "poemai_generated_failed_toast": "Falha ao gerar poema, tente novamente",
    "poemai_generated_poem": "Poema Gerado",
    "poemai_copy_btn": "Copiar",
    "poemai_copy_success_toast": "Copiado com sucesso",
    "poemai_privacy": "Política de privacidade",
  },
  es: {
    "poemai_title": "Generador de Poemas",
    "poemai_input_title": "Generador de Poemas",
    "poemai_input_subtitle": "Generar un poema sobre...",
    "poemai_input_tips": "Voces del bosque antiguo",
    "poemai_generate_btn": "Generar",
    "poemai_powered_by_gpt": "Impulsado por ChatGPT",
    "poemai_thinking_status": "Pensando...",
    "poemai_network_err_toast": "Error de red. Intente de nuevo por favor",
    "poemai_server_err_toast": "Error de servidor, intenta de nuevo",
    "poemai_generated_failed_toast": "Error al generar el poema, intenta de nuevo",
    "poemai_generated_poem": "Poema Generado",
    "poemai_copy_btn": "Copiar",
    "poemai_copy_success_toast": "Copiado con éxito",
    "poemai_privacy": "Política de privacidad",
  }
}


const i18n = createI18n({
  locale: 'en', // 默认语言
  messages,
});

export default i18n;