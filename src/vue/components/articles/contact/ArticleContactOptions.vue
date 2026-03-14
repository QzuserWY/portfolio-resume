<template>
  <Article class="article-contact" :model="model">
    <div class="contact-quote-wrap">
      <p class="quote-kicker">人文寄语</p>
      <blockquote class="contact-quote">
        {{ quoteText }}
      </blockquote>
    </div>

    <div class="contact-hero">
      <div v-for="item in contactLinks" :key="item.label" class="contact-card">
        <IconView
          class="contact-icon"
          :fa-icon="item.faIcon"
          :background-color="utils.getRootSCSSVariable('primary')"
        />

        <div class="contact-content">
          <p class="contact-label m-0" v-html="item.label" />

          <a
            v-if="item.href"
            :href="item.href"
            target="_blank"
            class="contact-value link-masked"
            v-html="item.value"
          />

          <p v-else class="contact-value m-0 text-light-7" v-html="item.value" />

          <CopyButton v-if="item.copy" :text="item.value" />
        </div>
      </div>
    </div>
  </Article>
</template>

<script setup>
import { computed, inject } from "vue"
import Article from "/src/vue/components/articles/base/Article.vue"
import CopyButton from "/src/vue/components/widgets/CopyButton.vue"
import IconView from "/src/vue/components/widgets/IconView.vue"
import { useUtils } from "/src/composables/utils.js"

const props = defineProps({
  /** @type {Article} **/
  model: {
    type: Object,
    required: true,
  },
})

const utils = useUtils()

/** @type {{value:Profile}} */
const profile = inject("profile")

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const contactLinks = computed(() => {
  const contactIds = props.model.getSetting("contact_ids", [])
  return contactIds
    .map((contactId) => {
      return profile.value.getContactOptionWithId(contactId)
    })
    .filter((contact) => Boolean(contact))
    .map((item) => {
      return {
        faIcon: item.faIcon.replace("regular", "solid"),
        label: localizeFromStrings(item.id).replace("locales.", ""),
        href: item.href,
        value: item.getValue(localize, false),
        copy: item.copy,
      }
    })
})

const quoteText = computed(() => {
  return (
    localize(props.model.locales, "quote", true) ||
    "真正有价值的交付，不止能跑通流程，还能让团队更安心。"
  )
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.contact-hero {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @include media-breakpoint-down(lg) {
    grid-template-columns: 1fr;
  }
}

div.contact-card {
  min-height: 150px;
  padding: 28px 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(20, 15, 41, 0.08);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 251, 0.96));
  box-shadow: 0 8px 22px rgba(18, 34, 56, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 26px rgba(18, 34, 56, 0.12);
  }
}

div.contact-icon {
  width: 64px;
  height: 64px;
  min-width: 64px;
  font-size: 30px;
  border-radius: 18px;
  overflow: hidden;
}

div.contact-content {
  margin-left: 18px;
}

p.contact-label {
  font-size: 0.88rem;
  color: rgba(73, 80, 87, 0.92);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

a.contact-value,
p.contact-value {
  margin: 8px 0 0;
  font-size: clamp(1.1rem, 2.3vw, 1.38rem);
  font-weight: 700;
  color: $text-default-color;
  word-break: break-word;
}

blockquote.contact-quote {
  margin: 0 0 18px;
  padding: 16px 20px;
  border-left: 4px solid rgba(69, 129, 220, 0.9);
  border-radius: 0 14px 14px 0;
  color: rgba(20, 15, 41, 0.9);
  background: rgba(69, 129, 220, 0.08);
  font-size: clamp(1rem, 1.75vw, 1.12rem);
  line-height: 1.8;
  letter-spacing: 0.01em;
}

div.contact-quote-wrap {
  margin-bottom: 2px;
}

p.quote-kicker {
  margin: 0 0 8px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(69, 129, 220, 0.92);
}
</style>
