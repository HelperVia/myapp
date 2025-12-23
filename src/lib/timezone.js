class Timezone {
  convert(timestamp) {
    this.timestamp = timestamp;
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    this.timeZone = timeZone;
    return this;
  }

  toLocalTimestamp() {
    const date = new Date(this.timestamp);
    const localString = date.toLocaleString("en-US", {
      timeZone: this.timeZone,
    });

    return new Date(localString).getTime();
  }

  format() {
    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: this.timeZone,
    }).format(new Date(this.timestamp));
  }
}

export default new Timezone();
